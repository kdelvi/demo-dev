import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
// import { PageLoaderService } from '../core/page-loader/page-loader.service';
// import { AppConstants } from '../core/constants';

/**
 * Service to pre/post process the api calls and trigger http call.
 * # NOTE: ApiService should only act as single point in APP for making API calls.
 * # NOTE: ApiService shouldn't import any service other than 'HttpClient', 'PageLoaderService'
 * # NOTE: Exception/error handling should be done at exception interceptor level
 *
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {

  private processQueue: any = [];

  private subscription: Subscription;

  constructor(
    private http: HttpClient
    // private pageLoaderService: PageLoaderService
  ) { }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  /**
   * Trigger the http call
   * Handles the logic for generalized implementation on any API call
   *
   * @param {('POST' | 'PUT' | 'GET' | 'DELETE')} serviceType
   * @param {string} serviceUrl
   * @param {({} | any)} params
   * @param {boolean} [showLoader=true]
   * @param {{ headers?: HttpHeaders, observe?: string, responseType?: string }} [options={}]
   * @returns
   * @memberof ApiService
   */
  public apiCall(
    serviceType: 'POST' | 'PUT' | 'GET' | 'DELETE',
    serviceUrl: string,
    params: {} | any = {},
    showLoader: boolean = true,
    options: { headers?: HttpHeaders, observe?: string, responseType?: string } = {}
  ) {

    // get user provided api-options
    const apiOption = this.getUserOptions(options);

    if (showLoader) {
      this.processQueue.push(serviceUrl);
      // this.pageLoaderService.show();
    }

    if (serviceType === 'GET') {
      // convert params object to query-params
      let url = serviceUrl;
      let queryParam = '';
      if (typeof params === 'string') {
        queryParam = params;
      } else {
        queryParam = Object.keys(params).map(
          key => key.toString().trim() + '=' + (params[key] || '').toString().trim()
        ).join('&') || '';
        queryParam = queryParam.trim() === '' ? '' : '?' + queryParam;
      }
      url = serviceUrl + queryParam ;

      return this.http
        .get(this.attachDefaultQueryParam(url), apiOption).pipe(
          map(resp => this.extractData<any>(resp, serviceUrl, apiOption)),
          finalize(() => this.processQ(serviceUrl))
        );

    } else if (serviceType === 'PUT') {
      return this.http
        .put(this.attachDefaultQueryParam(serviceUrl), params, apiOption).pipe(
          map(resp => this.extractData<any>(resp, serviceUrl, apiOption)),
          finalize(() => this.processQ(serviceUrl))
        );

    } else if (serviceType === 'DELETE') {

      // adding body in requestOptions for httpClient.delete method, as it doesn't support body as options as of now
      apiOption['body'] = params;

      return this.http
        .delete(this.attachDefaultQueryParam(serviceUrl), apiOption).pipe(
          map(resp => this.extractData<any>(resp, serviceUrl, apiOption)),
          finalize(() => this.processQ(serviceUrl))
        );

    } else {
      // POST
      return this.http
        .post(this.attachDefaultQueryParam(serviceUrl), params, apiOption).pipe(
          map(res => this.extractData<any>(res, this.attachDefaultQueryParam(serviceUrl), options)),
          finalize(() => this.processQ(serviceUrl))
        );
    }

  }

  /**
   * Logic for closing loader icon
   *
   * Update the object 'processQueue' with every api call response
   * When 'processQueue' array is empty hide the loader icon
   */
  private processQ(apiTypeQuery: any) {
    const index = this.processQueue.indexOf(apiTypeQuery);
    if (index > -1) {
      this.processQueue.splice(index, 1);
    }
    if (this.processQueue.length === 0) {
      // this.pageLoaderService.hide();
    }
  }

  /**
   * Fetch the data from the response received from the http call based on any special service type
   * Handle the custom error codes received in the success response of http call
   */
  private extractData<T>(res: any, serviceUrl: string = null, apiOption: {} = null) {
    let data = <T>({});

    // default response is 'response.body' unless requesting full response using 'observe':'response'
    const body = apiOption.hasOwnProperty('observe') && apiOption['observe'] === 'response' ? res.body : res;

    // get the data from response
    data = body && body.data || body;

    return <T>(data);
  }

  /**
   * fetch any call specific http-options passed from source (component/service)
   */
  private getUserOptions(options: any = {}) {
    const { headers, observe, responseType } = options,
      apiOptions = {};

    /*
     * Setting 'withCredentials' for all API calls.
     * For some reson 'withCredentials' option works only if it has set before making the HttpClient call and not in interceptors.
     *
     */
    apiOptions['withCredentials'] = false;

    // update any call specific http-options passed by the source
    if (headers) { apiOptions['headers'] = headers; }
    if (responseType) { apiOptions['responseType'] = responseType; }
    if (observe) { apiOptions['observe'] = observe; }

    return apiOptions;
  }

  /**
   * attach the drupal required query param in api urls
   *
   * @param {string} url
   * @returns
   * @memberof ApiService
   */
  attachDefaultQueryParam(url: string) {
    const res = url;
    // const defaultQueryParam = '_format=json';
    // const addDefaultQueryParam = AppConstants.addDefaultQueryParam;
    // if (url && addDefaultQueryParam && defaultQueryParam) {
    //   res = url + (url.indexOf('?') === -1 ? '?' : '&') + defaultQueryParam;
    // }

    return res;
  }

  /**
   * force reset the processQueue to remove the loader
   * ##NOTE: use this method only in edge case scenarios
   * # calling on logout() call
   *
   * @memberof ApiService
   */
  hardResetProcessQ() {
    this.processQueue = [];
    this.processQ(null);
  }

}

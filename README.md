
##  The Angular HTTP Client - GET calls with Request Parameters

**HttpClient** is the HTTP service.

### Adding parameters to an HTTP GET call.
* In the component declare a constant of type **HttpParams** and set the parameters wanted with the ``` set() ``` method:
  #### Ej.:
  ```
    const params = new HttpParams()
                    .set('page', '1')
                    .set('pageSize', '10');
  ```
* Include the parameters as second argument of the ``` http.get()``` method call:
    #### Ej.:
  ```
    this.courses$ = this.http.get('/api/courses', { params });
  ```
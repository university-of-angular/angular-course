##  Angular Custom Service - Data Modification with an HTTP PUT
The ``` put()``` method is used for updating an object which is already saved in the database. It also requires two parameters, first the **URL** and second **request body**. For updating the object, we need to pass the **object ID** in the URL as a route parameter. 

#### Ej.:
```
public updatePost(postData: Object) {
  let endPoints = "/posts/1"
  this.httpClient.put(this.url + endPoints, postData).subscribe(data => {
    console.log(data);
  });
}
```
## HTTP Headers
If we want to add custom HTTP Headers to our HTTP request, in addition to the headers the browser already attaches automatically we can do so using the HttpHeaders class:
#### Ej.:
```
const headers = new HttpHeaders()
            .set("X-CustomHeader", "custom header value");

public updatePost(postData: Object) {
  let endPoints = "/posts/1"
  this.httpClient.put(this.url + endPoints, postData, {headers}).subscribe(data => {
    console.log(data);
  });
}            
```
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class ObservationsService {
    public HTTP_OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    public OBSERVATIONS: Map<string, any> = new Map<string, any>();

    _defaultUrl = environment.mccapiUrl;
    constructor(
        protected http: HttpClient
    ) {
    }

    _observationUrl = "find/latest/observation";
    getObservation(patientId: string, code: string): Promise<any> {
        const key = patientId + code;

        if (this.OBSERVATIONS.has(key)) {
            return Promise.resolve(this.OBSERVATIONS.get(key));
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationUrl}?subject=${patientId}&code=${code}`).toPromise()
                .then(res => {
                    this.OBSERVATIONS.set(key, res);
                    return res;
                });
        }
    };

    _observationByValueSetUrl = "observationsbyvalueset"
    getObservationsByValueSet = (patientId: string, valueSet: string): Promise<any> => {
        const key = patientId + valueSet;

        if (this.OBSERVATIONS.has(key)) {
            return Promise.resolve(this.OBSERVATIONS.get(key));
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationByValueSetUrl}?subject=${patientId}&valueset=${valueSet}`, this.HTTP_OPTIONS).toPromise()
                .then(res => {
                    this.OBSERVATIONS.set(key, res);
                    return res;
                });
        }
    }
}


// getObservationsByPanel(patientId: string, code: string): Promise < any > {
//     const successHandler = (resp: HttpResponse<any>) => {
//         debugger;
//     }
//         const errorHandler = (resp: HttpErrorResponse) => {
//         debugger;
//     }

//         return this.http.get(`${environment.mccapiUrl}/${this._observationsUrl}?subject=${patientId}&code=${code}&mode=panel`, this.HTTP_OPTIONS).toPromise().then(successHandler).catch(errorHandler);
// }
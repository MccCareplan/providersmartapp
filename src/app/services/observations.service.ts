import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Constants } from "../common/constants";
import { MccObservation } from "../generated-data-api";

interface PatientLabResultsMap {
    name: string;
    value: string;
    type: string;
}

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
    getObservation(patientId: string, code: string, keyToStore?: string): Promise<any> {
        const key = patientId + "-" + code;

        if (this.OBSERVATIONS.has(key)) {
            let returnVal = this.OBSERVATIONS.get(key);
            if (keyToStore) {
                returnVal.key = keyToStore;
            }
            return Promise.resolve(returnVal);
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationUrl}?subject=${patientId}&code=${code}`).toPromise()
                .then((res: MccObservation) => {
                    this.OBSERVATIONS.set(key, res);
                    if (keyToStore) res.key = keyToStore;
                    return res;
                });
        }
    };

    _observationsUrl = "observations";
    getObservations(patientId: string, code: string, keyToStore?: string): Promise<any> {
        const key = patientId + "-" + code + "-multiple";

        if (this.OBSERVATIONS.has(key)) {
            let returnVal = this.OBSERVATIONS.get(key);
            if (keyToStore) {
                returnVal[0].key = keyToStore;
            }
            return Promise.resolve(this.OBSERVATIONS.get(key));
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationsUrl}?subject=${patientId}&code=${code}&sort=descending`).toPromise()
                .then((res: MccObservation[]) => {
                    this.OBSERVATIONS.set(key, res);
                    if (res.length > 0 && keyToStore) {
                        res[0].key = keyToStore;
                    }
                    return res;
                });
        }
    };

    _observationByValueSetUrl = "observationsbyvalueset"
    getObservationsByValueSet = (patientId: string, valueSet: string, sort?: string, max?: string, keyToStore?: string): Promise<any> => {
        const key = patientId + "-" + valueSet + (sort ? "-" + sort : "") + (max ? "-" + max : "") + (keyToStore ? "-" + keyToStore : "");
        const url = `${environment.mccapiUrl}/${this._observationByValueSetUrl}?subject=${patientId}&valueset=${valueSet}` + (sort ? `&sort=${sort}` : ``) + (max ? `&max=${max}` : ``);

        if (this.OBSERVATIONS.has(key)) {
            let returnVal = this.OBSERVATIONS.get(key);
            if (returnVal.length > 0 && keyToStore) {
                returnVal[0].key = keyToStore;
            }
            return Promise.resolve(returnVal);
        }
        else {
            return this.http.get(url, this.HTTP_OPTIONS).toPromise()
                .then((res: MccObservation[]) => {
                    this.OBSERVATIONS.set(key, res);
                    if (res.length > 0 && keyToStore) {
                        res[0].key = keyToStore;
                    }
                    return res;
                });
        }
    }

    _observationsByPanelUrl = "observations"
    getObservationsByPanel(patientId: string, code: string, sort?: string, max?: string, keyToStore?: string): Promise<any> {
        const key = patientId + "-" + code + (sort ? "-" + sort : "") + (max ? "-" + max : "") + (keyToStore ? "-" + keyToStore : "");

        if (this.OBSERVATIONS.has(key)) {
            let returnVal = this.OBSERVATIONS.get(key);
            if (returnVal.length > 0 && keyToStore) {
                returnVal[0].key = keyToStore;
            }
            return Promise.resolve(returnVal);
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationsByPanelUrl}?subject=${patientId}&code=${code}` + (sort ? `&sort=${sort}` : ``) + (max ? `&max=${max}` : ``) + `&mode=panel`, this.HTTP_OPTIONS).toPromise()
                .then((res: MccObservation[]) => {
                    this.OBSERVATIONS.set(key, res);
                    if (res.length > 0 && keyToStore) {
                        res[0].key = keyToStore;
                    }
                    return res;
                });
        }
    }

    getLabResults(patientId: string, longTermCondition: string): Promise<void | MccObservation[]> {
        let results = [];
        let callsToMake: PatientLabResultsMap[] = Constants.labResultsMap.get(longTermCondition);
        let promiseArray = [];
        callsToMake.forEach((v, i) => {
            switch (v.type) {
                case "code":
                    promiseArray.push(this.getObservation(patientId, v.value, v.name));
                    break;
                case "valueset":
                    promiseArray.push(this.getObservationsByValueSet(patientId, v.value, "descending", "1", v.name));
                    break;
                case "panel":
                    promiseArray.push(this.getObservationsByPanel(patientId, v.value, "descending", "1", v.name));
                    break;
            }
        })
        return Promise.all(promiseArray).then((resArr: any[]) => {
            resArr.filter(x => this.filterOutBadValues(x)).forEach((res: any, index: number) => {
                switch (true) {
                    case (res && !res.length): // code
                        results.push(res);
                        break;
                    case (res && res.length > 0): // valueset
                        results.push(res[0]);
                        break;
                    case (res && res.length > 1): // panel
                        results.push(res[0]);
                        break;
                }
            });
            return results;
        });
    }

    filterOutBadValues = (res: any): boolean => {
        if (res.status === "notfound")
            return false;
        if (!res)
            return false;
        if (res.length < 1)
            return false;
        return true;
    }

    getVitalSignResults(patientId: string, longTermCondition: string): any {
        let results = [];
        let callsToMake: PatientLabResultsMap[] = Constants.vitalSignsMap.get(longTermCondition);
        let promiseArray = [];
        callsToMake.forEach((v, i) => {
            switch (v.type) {
                case "code":
                    promiseArray.push(this.getObservation(patientId, v.value, v.name));
                    break;
                case "valueset":
                    promiseArray.push(this.getObservationsByValueSet(patientId, v.value, "descending", "1", v.name));
                    break;
                case "panel":
                    promiseArray.push(this.getObservationsByPanel(patientId, v.value, "descending", "1", v.name));
                    break;
            }
        })
        return Promise.all(promiseArray).then((resArr: any[]) => {
            resArr.filter(x => this.filterOutBadValues(x)).forEach((res: any, index: number) => {
                switch (true) {
                    case (res && !res.length): // code
                        results.push(res);
                        break;
                    case (res && res.length > 0): // valueset
                        results.push(res[0]);
                        break;
                    case (res && res.length > 1): // panel
                        results.push(res[0]);
                        break;
                }
            });
            return results;
        });
    }
}
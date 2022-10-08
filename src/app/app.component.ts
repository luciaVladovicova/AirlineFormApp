import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airlineFormApp';
  checked = false;
  types: string[] = [];

  loadStringAirports: any;
  loadStringCountries: any;
  stations: string[] = [];
  countries: string[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  airlineRequestForm: FormGroup = this.formBuilder.group({
    airports: [''],
    countries: [''],
    METAR: [''],
    SIGMET: [''],
    TAF: [''],
  });

  ngOnInit() {}

  requestData() {
    var body;
    var includeBody;
    // this.types=["METAR", "TAF_LONGTAF"];
    // var stationsTest=["LKPR", "EGLL"];
    //this.countries=["SQ"]

    //types checkboxes ------------------------------------------------------------------------------------------
    var metar = this.airlineRequestForm.get('METAR')?.value;
    var signet = this.airlineRequestForm.get('SIGMET')?.value;
    var taf = this.airlineRequestForm.get('TAF')?.value;

    if (metar == true) {
      this.types = ['METAR'];
    }

    if (signet == true) {
      this.types = ['SIGMET'];
    }

    if (taf == true) {
      this.types = ['TAF_LONGTAF'];
    }

    if (metar == true && taf == true) {
      this.types = ['METAR', 'TAF_LONGTAF'];
    }

    if (metar == true && signet == true) {
      this.types = ['METAR', 'SIGMET'];
    }

    if (signet == true && taf == true) {
      this.types = ['SIGMET', 'TAF_LONGTAF'];
    }

    //-------------------------------------------------------------------------------------------------------------------------------------

    //airports -------------------------------------------------------------------------

    this.loadStringAirports = this.airlineRequestForm.get('airports')?.value;
    let loadTextAirports = this.loadStringAirports;
    this.stations = loadTextAirports.split(' ');

    //counties--------------------------------------------------------------

    this.loadStringCountries = this.airlineRequestForm.get('countries')?.value;
    let loadTextCounties = this.loadStringCountries;
    this.countries = loadTextCounties.split(' ');

    //-------------------------------------------------------------------------------------------

    includeBody = {
      id: 'briefing01',
      reportTypes: this.types,
      stations: this.stations,
      countries: this.countries,
    };
    body = { id: 'query01', method: 'query', params: [includeBody] };

    console.log(body);

    this.http
      .post<any>('https://ogcie.iblsoft.com/ria/opmetquery', body)
      .subscribe((data) => {
        // this.postId = data.id;
        console.log(data);
      });
  }
}

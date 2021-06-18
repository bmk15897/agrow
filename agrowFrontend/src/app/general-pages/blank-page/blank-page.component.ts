import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {

  masterData = [];
  cropList = [
    "Potato",
    "Wheat",
    "Rice"
  ];

  yearPeriod = [
    '2020',
    '2021'
  ]

  uniqueCropList = [];
  filterData = [];
  potatoData = [];
  tomatoData = [];
  transData = [];

  searchForm: FormGroup;
  cropName: FormControl;
  timePeriod: FormControl;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // ---------------------------------

    this.searchForm = new FormControl({
      cropName : new FormControl('', Validators.required),
      timePeriod: new FormControl('')
    })

    this.getJSON().subscribe(data => {
      console.log("Crop data: " + data.length)

      this.masterData = data;

      for(let i=0; i<1000; ++i) {
        this.cropList.push(this.masterData[i].Crop)
      }

      this.uniqueCropList = [];
      this.uniqueCropList = this.cropList.filter(this.onlyUnique);
       
      //  console.log('Unique crops: ' + this.uniqueCropList.length  + ' ' + this.uniqueCropList); // ['a', 1, 2, '1']

      this.potatoData = [
        ['madhya pradesh', Math.round(Math.random()*20) ],
        ['uttar pradesh', 1],
        ['karnataka', 2],
        ['nagaland', 3],
        ['bihar', 4],
        ['lakshadweep', 5],
        ['andaman and nicobar', 6],
        ['assam', 14],
        ['west bengal', 8],
        ['puducherry', Math.round(Math.random()*20)],
        ['daman and diu', 10],
        ['gujarat', Math.round(Math.random()*20)],
        ['rajasthan', 12],
        ['dadara and nagar havelli', 13],
        ['chhattisgarh', 14],
        ['tamil nadu', 15],
        ['chandigarh', Math.round(Math.random()*20)],
        ['punjab', 17],
        ['haryana', 18],
        ['andhra pradesh', 19],
        ['maharashtra', 20],
        ['himachal pradesh', 21],
        ['meghalaya', Math.round(Math.random()*20)],
        ['kerala', 23],
        ['telangana', 40],
        ['mizoram', 24],
        ['tripura', 31],
        ['manipur', 6],
        ['arunanchal pradesh', 28],
        ['jharkhand', Math.round(Math.random()*20)],
        ['goa', 12],
        ['nct of delhi', 31],
        ['odisha', 56],
        ['jammu and kashmir', 12],
        ['sikkim', 10],
        ['uttarakhand', Math.round(Math.random()*20)]
    ];

    this.tomatoData = [
      ['madhya pradesh', 15],
      ['uttar pradesh', 5],
      ['karnataka', Math.round(Math.random()*20)],
      ['nagaland', 3],
      ['bihar', 4],
      ['lakshadweep', Math.round(Math.random()*35)],
      ['andaman and nicobar', 6],
      ['assam', 7],
      ['west bengal', 8],
      ['puducherry', Math.round(Math.random()*20)],
      ['daman and diu', 10],
      ['gujarat', 11],
      ['rajasthan', 12],
      ['dadara and nagar havelli', 13],
      ['chhattisgarh', 14],
      ['tamil nadu', Math.round(Math.random()*30)],
      ['chandigarh', Math.round(Math.random()*20)],
      ['punjab', 17],
      ['haryana', 18],
      ['andhra pradesh', 19],
      ['maharashtra', 27],
      ['himachal pradesh', Math.round(Math.random()*20)],
      ['meghalaya', 22],
      ['kerala', 23],
      ['telangana', 24],
      ['mizoram', 15],
      ['tripura', Math.round(Math.random()*20)],
      ['manipur', 27],
      ['arunanchal pradesh', 28],
      ['jharkhand', 29],
      ['goa', 30],
      ['nct of delhi', Math.round(Math.random()*20)],
      ['odisha', 32],
      ['jammu and kashmir', 33],
      ['sikkim', Math.round(Math.random()*20)],
      ['uttarakhand', 35]
  ];

  console.log(this.potatoData)

  console.log(this.tomatoData)

  this.submit("Tomato")
  
    });
  }

  submit(cropName) {

    let stateFound:boolean=false;
    let yearFound:boolean=false;

    this.transData = [];

    console.log('In submit')

    //console.log('Master data: ' + this.masterData)

    this.filterData = this.masterData.filter(obj => {
      return (obj.Crop === cropName);
    })

    console.log('Filter Data: ' + this.filterData.length + ' ' + JSON.stringify(this.filterData))

    for(let i=0; i<15; ++i) {

      if(this.filterData[i]) {

        let year = this.filterData[i].Year;
        let state = this.filterData[i].State;
        let produce = this.filterData[i].Production;
        console.log("Transformed data: " + this.transData.length + " " + JSON.stringify(this.transData) )

        // console.log('Filter obj' + JSON.stringify(this.filterData[i]) )

        console.log(year + ' ' + state + ' ' + produce)
  
        if(this.transData.length < 1) {

          let obj = {
            "year": year,
            "data" : [
              {
                "state": state,
                "produce": parseInt(produce)
              }
            ]
          }

          this.transData.push(obj)

          //console.log('Transformed Data: ' + JSON.stringify(this.transData) )
          continue;

        } else {

          for(let j=0; j<this.transData.length; ++j) {

            yearFound = false;
            // console.log(this.transData[j].year === year)
            console.log(this.transData[j].year + "  "+ year)
            if(this.transData[j].year === year) {

              console.log('Year found')
              
              yearFound = true;
              for(let k=0; k<this.transData[j]['data'].length; ++k ) {
                
                stateFound = false;
                if(this.transData[j]['data'][k]['state'] === state ) {
                  
                  this.transData[j]['data'][k]['produce'] = parseInt(this.transData[j]['data'][k]['produce']) + parseInt(produce);
                  stateFound = true;
                  break;
                } 
              }

              if(!stateFound) {
                this.transData[j]['data'].push ({
                  "state": state,
                  "produce": parseInt(produce)
                })
              }

              continue;

            } 

          }
          if(!yearFound) {
            let obj = {
              "year": year,
              "data" : [
                {
                  "state": state,
                  "produce": parseInt(produce)
                }
              ]
            }
            this.transData.push(obj)
          }

          continue;

        }

      }
    }

    console.log('Filter Data: ' + JSON.stringify(this.filterData) )

    console.log('Trans Data: ' + JSON.stringify(this.transData) )

    Highcharts.mapChart('container', {
      chart: {
          map: 'countries/in/custom/in-all-disputed'
      },
  
      title: {
          text: 'Yearly Crop Yield'
      },
  
      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
  
      colorAxis: {
          min: 0
      },
  
      series: [{
          data: this.potatoData,
          name: cropName,
          states: {
              hover: {
                  color: '#BADA55'
              }
          },
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          }
      }]
  });

  }

  getJSON(): Observable<any> {
    return this.http.get("./assets/crop_data.json")
  }  

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
 

}

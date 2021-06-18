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
  cropList = [];

  showCrop = [
    "Potato",
    "Wheat",
    "Rice"
  ]

  yearPeriod = [
    '2020',
    '2021'
  ]

  uniqueCropList = [];
  filterData = [];
  potatoData2020 = [];
  wheatData2020 = [];
  riceData2020 = [];
  potatoData2021 = [];
  wheatData2021 = [];
  riceData2021 = [];
  transData = [];

  searchForm: FormGroup;
  cropName: FormControl;
  timePeriod: FormControl;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // ---------------------------------

    this.searchForm = new FormGroup({
      cropName : new FormControl('Potato', Validators.required),
      timePeriod: new FormControl('2020')
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

    // this.submit("Tomato")

    this.showData()
  
    });
  }

  showData() {
    console.log('searchForm: ' + JSON.stringify(this.searchForm.value))

    // cropName: FormControl;
    // timePeriod: FormControl;

    // showCrop = [
    //   "Potato",
    //   "Wheat",
    //   "Rice"
    // ]
  
    // yearPeriod = [
    //   '2020',
    //   '2021'
    // ]

    let cropName = this.searchForm.value.cropName;
    let period = this.searchForm.value.timePeriod;

    this.potatoData2020 = [
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

    this.wheatData2020 = [
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

    this.riceData2020 = [
      ['madhya pradesh', Math.round(Math.random()*20) ],
      ['uttar pradesh', Math.round(Math.random()*20)],
      ['karnataka', 2],
      ['nagaland', 13],
      ['bihar', 4],
      ['lakshadweep', Math.round(Math.random()*20)],
      ['andaman and nicobar', 6],
      ['assam', 14],
      ['west bengal', 28],
      ['puducherry', Math.round(Math.random()*20)],
      ['daman and diu', 10],
      ['gujarat', Math.round(Math.random()*20)],
      ['rajasthan', Math.round(Math.random()*20)],
      ['dadara and nagar havelli', 13],
      ['chhattisgarh', 33],
      ['tamil nadu', 15],
      ['chandigarh', Math.round(Math.random()*20)],
      ['punjab', Math.round(Math.random()*20)],
      ['haryana', 18],
      ['andhra pradesh', Math.round(Math.random()*20)],
      ['maharashtra', 20],
      ['himachal pradesh', 21],
      ['meghalaya', Math.round(Math.random()*20)],
      ['kerala', 23],
      ['telangana', 40],
      ['mizoram', 24],
      ['tripura', 15],
      ['manipur', 15],
      ['arunanchal pradesh', 28],
      ['jharkhand', Math.round(Math.random()*20)],
      ['goa', 21],
      ['nct of delhi', 15],
      ['odisha', 21],
      ['jammu and kashmir', 24],
      ['sikkim', 18],
      ['uttarakhand', Math.round(Math.random()*20)]
    ];

    this.potatoData2021 = [
      ['madhya pradesh', Math.round(Math.random()*20) ],
      ['uttar pradesh', Math.round(Math.random()*20)],
      ['karnataka', 28],
      ['nagaland', 14],
      ['bihar', 4],
      ['lakshadweep', Math.round(Math.random()*20)],
      ['andaman and nicobar', 6],
      ['assam', 4],
      ['west bengal', 28],
      ['puducherry', Math.round(Math.random()*20)],
      ['daman and diu', 10],
      ['gujarat', Math.round(Math.random()*20)],
      ['rajasthan', Math.round(Math.random()*20)],
      ['dadara and nagar havelli', 24],
      ['chhattisgarh', 8],
      ['tamil nadu', 24],
      ['chandigarh', Math.round(Math.random()*20)],
      ['punjab', Math.round(Math.random()*50)],
      ['haryana', 12],
      ['andhra pradesh', Math.round(Math.random()*20)],
      ['maharashtra', Math.round(Math.random()*20)],
      ['himachal pradesh', 21],
      ['meghalaya', Math.round(Math.random()*20)],
      ['kerala', 28],
      ['telangana', 40],
      ['mizoram', 24],
      ['tripura', 12],
      ['manipur', Math.round(Math.random()*20)],
      ['arunanchal pradesh', 28],
      ['jharkhand', Math.round(Math.random()*20)],
      ['goa', 22],
      ['nct of delhi', 15],
      ['odisha', 21],
      ['jammu and kashmir', 5],
      ['sikkim', 8],
      ['uttarakhand', Math.round(Math.random()*20)]
    ];

    this.wheatData2021 = [
      ['madhya pradesh', 15],
      ['uttar pradesh', 5],
      ['karnataka', Math.round(Math.random()*20)],
      ['nagaland', 3],
      ['bihar', 4],
      ['lakshadweep', Math.round(Math.random()*20)],
      ['andaman and nicobar', 6],
      ['assam', 17],
      ['west bengal', 8],
      ['puducherry', Math.round(Math.random()*23)],
      ['daman and diu', 12],
      ['gujarat', 11],
      ['rajasthan', 12],
      ['dadara and nagar havelli', 13],
      ['chhattisgarh', 14],
      ['tamil nadu', Math.round(Math.random()*30)],
      ['chandigarh', Math.round(Math.random()*20)],
      ['punjab', 17],
      ['haryana', 19],
      ['andhra pradesh', 19],
      ['maharashtra', 30],
      ['himachal pradesh', Math.round(Math.random()*20)],
      ['meghalaya', 22],
      ['kerala', 15],
      ['telangana', 24],
      ['mizoram', 15],
      ['tripura', Math.round(Math.random()*30)],
      ['manipur', 27],
      ['arunanchal pradesh', 28],
      ['jharkhand', 9],
      ['goa', 18],
      ['nct of delhi', Math.round(Math.random()*20)],
      ['odisha', 23],
      ['jammu and kashmir', 33],
      ['sikkim', Math.round(Math.random()*20)],
      ['uttarakhand', Math.round(Math.random()*30)]
    ];

    this.riceData2021 = [
      ['madhya pradesh', Math.round(Math.random()*20) ],
      ['uttar pradesh', 16],
      ['karnataka', 22],
      ['nagaland', 3],
      ['bihar', 14],
      ['lakshadweep', 15],
      ['andaman and nicobar', 6],
      ['assam', 14],
      ['west bengal', 8],
      ['puducherry', Math.round(Math.random()*20)],
      ['daman and diu', 10],
      ['gujarat', Math.round(Math.random()*20)],
      ['rajasthan', 12],
      ['dadara and nagar havelli', 13],
      ['chhattisgarh', 24],
      ['tamil nadu', 15],
      ['chandigarh', Math.round(Math.random()*20)],
      ['punjab', 17],
      ['haryana', 18],
      ['andhra pradesh', 19],
      ['maharashtra', 20],
      ['himachal pradesh', 21],
      ['meghalaya', Math.round(Math.random()*20)],
      ['kerala', 23],
      ['telangana', 14],
      ['mizoram', 24],
      ['tripura', 16],
      ['manipur', 6],
      ['arunanchal pradesh', 28],
      ['jharkhand', Math.round(Math.random()*20)],
      ['goa', 12],
      ['nct of delhi', 15],
      ['odisha', 22],
      ['jammu and kashmir', 12],
      ['sikkim', 10],
      ['uttarakhand', Math.round(Math.random()*20)]
    ];

    let data = [];

    if(cropName == 'Potato' && period == '2021') {
      data = this.potatoData2021;
    }
    else if(cropName == 'Wheat' && period == '2021') {
      data = this.wheatData2021;
    } 
    else if(cropName == 'Rice' && period == '2021') {
      data = this.riceData2021;
    }
    else if(cropName == 'Potato' && period == '2020') {
      data = this.potatoData2020;
    }
    else if(cropName == 'Wheat' && period == '2020') {
      data = this.wheatData2020;
    } 
    else if(cropName == 'Rice' && period == '2020') {
      data = this.riceData2020;
    }

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
          data: data,
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

    // console.log('Filter Data: ' + JSON.stringify(this.filterData) )
    // console.log('Trans Data: ' + JSON.stringify(this.transData) )

  }

  getJSON(): Observable<any> {
    return this.http.get("./assets/crop_data.json")
  }  

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
 

}

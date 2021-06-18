import { Component, OnInit } from '@angular/core';
import { GovDataService } from '../service/gov-data.service';
import { Subscription } from 'rxjs';
import { __classPrivateFieldSet } from 'tslib';
import { CloudantDataService } from '../service/cloudant-data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  toggleProBanner(event) {
    console.log("123");
    event.preventDefault();
    document.querySelector('body').classList.toggle('removeProbanner');
  }

  mandiData;
  columnDefs = [
    { field: 'state', sortable: true, filter: true },
    { field: 'district', sortable: true, filter: true },
    { field: 'market', sortable: true, filter: true },
    { field: 'commodity', sortable: true, filter: true },
    { field: 'variety', sortable: true, filter: true },
    { field: 'arrival_date', sortable: true, filter: true },
    { field: 'min_price', sortable: true, filter: true },
    { field: 'max_price', sortable: true, filter: true },
    { field: 'modal_price', sortable: true, filter: true },
];

  rowData = [];

  yieldColumnDefs = [
    {  field:'State', sortable: true, filter: true },
    {  field:'District', sortable: true, filter: true },
    {  field:'Year', sortable: true, filter: true },
    {  field:'Season', sortable: true, filter: true },
    {  field:'Crop', sortable: true, filter: true },
    {  field:'Area', sortable: true, filter: true },
    {  field:'Production', sortable: true, filter: true }
  ];
  yieldRowData = [];

  constructor(
    private http: HttpClient,
    private govDataService: GovDataService,
    private coludantDataService: CloudantDataService) { 
  
      this.getJSON().subscribe(data => {
        console.log("Crop data: " + data.length)

        this.yieldRowData = [];

        // "State": "Andaman and Nicobar Islands",
        // "District": "NICOBARS",
        // "Year": "2000",
        // "Season": "Kharif     ",
        // "Crop": "Arecanut",
        // "Area": "1254.00",
        // "Production": "2000.00"

        let i=0;

        for(i=0; i<data.length; ++i) {
          let obj = {
            "State": data[i].State,
            "District": data[i].District,
            "Year": data[i].Year,
            "Season": data[i].Season,
            "Crop": data[i].Crop,
            "Area": data[i].Area,
            "Production": data[i].Production
          }

          this.yieldRowData.push(obj);
        }

        console.log('Yield row data: ', this.yieldRowData)

      });

      this.govDataService.getMandiData().subscribe( data => {

        this.mandiData = data;
        this.rowData = [];

        let i=0

        for(i=0; i<this.mandiData.records.length; ++i) {

          let obj = {
            state: this.mandiData.records[i].state, 
            district: this.mandiData.records[i].district,
            market: this.mandiData.records[i].market,
            commodity: this.mandiData.records[i].commodity,
            variety: this.mandiData.records[i].variety,
            arrival_date: this.mandiData.records[i].arrival_date,
            min_price: this.mandiData.records[i].min_price,
            max_price: this.mandiData.records[i].max_price,
            modal_price: this.mandiData.records[i].modal_price
          };

          this.rowData.push(obj);
        }

        console.log('Row data: ', this.rowData)

      });   
  }

  getJSON(): Observable<any> {
    return this.http.get("./assets/crop_data.json")
  }

  ngOnInit() {
  }

  date: Date = new Date();

  visitSaleChartData = [{
    label: 'CHN',
    data: [20, 40, 15, 35, 25, 50, 30, 20],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'USA',
    data: [40, 30, 20, 10, 50, 15, 35, 40],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'UK',
    data: [70, 10, 30, 40, 25, 50, 15, 30],
    borderWidth: 1,
    fill: false,
  }];

  visitSaleChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                min: 0,
                stepSize: 20,
                max: 80
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(235,237,242,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            }
        }],
        xAxes: [{
            gridLines: {
              display:false,
              drawBorder: false,
              color: 'rgba(0,0,0,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            },
            ticks: {
                padding: 20,
                fontColor: "#9c9fa6",
                autoSkip: true,
            },
            categoryPercentage: 0.4,
            barPercentage: 0.4
        }]
      }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ],
      borderColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ],
      borderColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ]
    },
  ];

  trafficChartData = [
    {
      data: [30, 30, 40],
    }
  ];

  trafficChartLabels = ["Search Engines", "Direct Click", "Bookmarks Click"];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

}

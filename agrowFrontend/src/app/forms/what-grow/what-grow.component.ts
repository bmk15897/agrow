import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-what-grow',
  templateUrl: './what-grow.component.html',
  styleUrls: ['./what-grow.component.scss']
})
export class WhatGrowComponent implements OnInit {

  submitClicked:boolean = false;

  growForm: FormGroup;
  selState: FormControl;
  selDist: FormControl;
  sowingPeriod: FormControl;
  sowingYear: FormControl;

  masterData = [];
  filterData = [];

  priceChartData = [];
  priceChartLabels = [];

  priceChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  priceChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]
    }
  ];

  produceChartData = [];
  produceChartLabels = [];

  produceChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  produceChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]
    }
  ];

  sowYear: Array <any> = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025'
   ];

  stateList: Array<any> = [
    {  
         "state":"Andhra Pradesh",
         "districts":[  
            "Anantapur",
            "Chittoor",
            "East Godavari",
            "Guntur",
            "Krishna",
            "Kurnool",
            "Nellore",
            "Prakasam",
            "Srikakulam",
            "Visakhapatnam",
            "Vizianagaram",
            "West Godavari",
            "YSR Kadapa"
         ]
      },
      {  
         "state":"Arunachal Pradesh",
         "districts":[  
            "Tawang",
            "West Kameng",
            "East Kameng",
            "Papum Pare",
            "Kurung Kumey",
            "Kra Daadi",
            "Lower Subansiri",
            "Upper Subansiri",
            "West Siang",
            "East Siang",
            "Siang",
            "Upper Siang",
            "Lower Siang",
            "Lower Dibang Valley",
            "Dibang Valley",
            "Anjaw",
            "Lohit",
            "Namsai",
            "Changlang",
            "Tirap",
            "Longding"
         ]
      },
      {  
         "state":"Assam",
         "districts":[  
            "Baksa",
            "Barpeta",
            "Biswanath",
            "Bongaigaon",
            "Cachar",
            "Charaideo",
            "Chirang",
            "Darrang",
            "Dhemaji",
            "Dhubri",
            "Dibrugarh",
            "Goalpara",
            "Golaghat",
            "Hailakandi",
            "Hojai",
            "Jorhat",
            "Kamrup Metropolitan",
            "Kamrup",
            "Karbi Anglong",
            "Karimganj",
            "Kokrajhar",
            "Lakhimpur",
            "Majuli",
            "Morigaon",
            "Nagaon",
            "Nalbari",
            "Dima Hasao",
            "Sivasagar",
            "Sonitpur",
            "South Salmara-Mankachar",
            "Tinsukia",
            "Udalguri",
            "West Karbi Anglong"
         ]
      },
      {  
         "state":"Bihar",
         "districts":[  
            "Araria",
            "Arwal",
            "Aurangabad",
            "Banka",
            "Begusarai",
            "Bhagalpur",
            "Bhojpur",
            "Buxar",
            "Darbhanga",
            "East Champaran (Motihari)",
            "Gaya",
            "Gopalganj",
            "Jamui",
            "Jehanabad",
            "Kaimur (Bhabua)",
            "Katihar",
            "Khagaria",
            "Kishanganj",
            "Lakhisarai",
            "Madhepura",
            "Madhubani",
            "Munger (Monghyr)",
            "Muzaffarpur",
            "Nalanda",
            "Nawada",
            "Patna",
            "Purnia (Purnea)",
            "Rohtas",
            "Saharsa",
            "Samastipur",
            "Saran",
            "Sheikhpura",
            "Sheohar",
            "Sitamarhi",
            "Siwan",
            "Supaul",
            "Vaishali",
            "West Champaran"
         ]
      },
      {  
         "state":"Chandigarh (UT)",
         "districts":[  
            "Chandigarh"
         ]
      },
      {  
         "state":"Chhattisgarh",
         "districts":[  
            "Balod",
            "Baloda Bazar",
            "Balrampur",
            "Bastar",
            "Bemetara",
            "Bijapur",
            "Bilaspur",
            "Dantewada (South Bastar)",
            "Dhamtari",
            "Durg",
            "Gariyaband",
            "Janjgir-Champa",
            "Jashpur",
            "Kabirdham (Kawardha)",
            "Kanker (North Bastar)",
            "Kondagaon",
            "Korba",
            "Korea (Koriya)",
            "Mahasamund",
            "Mungeli",
            "Narayanpur",
            "Raigarh",
            "Raipur",
            "Rajnandgaon",
            "Sukma",
            "Surajpur  ",
            "Surguja"
         ]
      },
      {  
         "state":"Dadra and Nagar Haveli (UT)",
         "districts":[  
            "Dadra & Nagar Haveli"
         ]
      },
      {  
         "state":"Daman and Diu (UT)",
         "districts":[  
            "Daman",
            "Diu"
         ]
      },
      {  
         "state":"Delhi (NCT)",
         "districts":[  
            "Central Delhi",
            "East Delhi",
            "New Delhi",
            "North Delhi",
            "North East  Delhi",
            "North West  Delhi",
            "Shahdara",
            "South Delhi",
            "South East Delhi",
            "South West  Delhi",
            "West Delhi"
         ]
      },
      {  
         "state":"Goa",
         "districts":[  
            "North Goa",
            "South Goa"
         ]
      },
      {  
         "state":"Gujarat",
         "districts":[  
            "Ahmedabad",
            "Amreli",
            "Anand",
            "Aravalli",
            "Banaskantha (Palanpur)",
            "Bharuch",
            "Bhavnagar",
            "Botad",
            "Chhota Udepur",
            "Dahod",
            "Dangs (Ahwa)",
            "Devbhoomi Dwarka",
            "Gandhinagar",
            "Gir Somnath",
            "Jamnagar",
            "Junagadh",
            "Kachchh",
            "Kheda (Nadiad)",
            "Mahisagar",
            "Mehsana",
            "Morbi",
            "Narmada (Rajpipla)",
            "Navsari",
            "Panchmahal (Godhra)",
            "Patan",
            "Porbandar",
            "Rajkot",
            "Sabarkantha (Himmatnagar)",
            "Surat",
            "Surendranagar",
            "Tapi (Vyara)",
            "Vadodara",
            "Valsad"
         ]
      },
      {  
         "state":"Haryana",
         "districts":[  
            "Ambala",
            "Bhiwani",
            "Charkhi Dadri",
            "Faridabad",
            "Fatehabad",
            "Gurgaon",
            "Hisar",
            "Jhajjar",
            "Jind",
            "Kaithal",
            "Karnal",
            "Kurukshetra",
            "Mahendragarh",
            "Mewat",
            "Palwal",
            "Panchkula",
            "Panipat",
            "Rewari",
            "Rohtak",
            "Sirsa",
            "Sonipat",
            "Yamunanagar"
         ]
      },
      {  
         "state":"Himachal Pradesh",
         "districts":[  
            "Bilaspur",
            "Chamba",
            "Hamirpur",
            "Kangra",
            "Kinnaur",
            "Kullu",
            "Lahaul &amp; Spiti",
            "Mandi",
            "Shimla",
            "Sirmaur (Sirmour)",
            "Solan",
            "Una"
         ]
      },
      {  
         "state":"Jammu and Kashmir",
         "districts":[  
            "Anantnag",
            "Bandipore",
            "Baramulla",
            "Budgam",
            "Doda",
            "Ganderbal",
            "Jammu",
            "Kargil",
            "Kathua",
            "Kishtwar",
            "Kulgam",
            "Kupwara",
            "Leh",
            "Poonch",
            "Pulwama",
            "Rajouri",
            "Ramban",
            "Reasi",
            "Samba",
            "Shopian",
            "Srinagar",
            "Udhampur"
         ]
      },
      {  
         "state":"Jharkhand",
         "districts":[  
            "Bokaro",
            "Chatra",
            "Deoghar",
            "Dhanbad",
            "Dumka",
            "East Singhbhum",
            "Garhwa",
            "Giridih",
            "Godda",
            "Gumla",
            "Hazaribag",
            "Jamtara",
            "Khunti",
            "Koderma",
            "Latehar",
            "Lohardaga",
            "Pakur",
            "Palamu",
            "Ramgarh",
            "Ranchi",
            "Sahibganj",
            "Seraikela-Kharsawan",
            "Simdega",
            "West Singhbhum"
         ]
      },
      {  
         "state":"Karnataka",
         "districts":[  
            "Bagalkot",
            "Ballari (Bellary)",
            "Belagavi (Belgaum)",
            "Bengaluru (Bangalore) Rural",
            "Bengaluru (Bangalore) Urban",
            "Bidar",
            "Chamarajanagar",
            "Chikballapur",
            "Chikkamagaluru (Chikmagalur)",
            "Chitradurga",
            "Dakshina Kannada",
            "Davangere",
            "Dharwad",
            "Gadag",
            "Hassan",
            "Haveri",
            "Kalaburagi (Gulbarga)",
            "Kodagu",
            "Kolar",
            "Koppal",
            "Mandya",
            "Mysuru (Mysore)",
            "Raichur",
            "Ramanagara",
            "Shivamogga (Shimoga)",
            "Tumakuru (Tumkur)",
            "Udupi",
            "Uttara Kannada (Karwar)",
            "Vijayapura (Bijapur)",
            "Yadgir"
         ]
      },
      {  
         "state":"Kerala",
         "districts":[  
            "Alappuzha",
            "Ernakulam",
            "Idukki",
            "Kannur",
            "Kasaragod",
            "Kollam",
            "Kottayam",
            "Kozhikode",
            "Malappuram",
            "Palakkad",
            "Pathanamthitta",
            "Thiruvananthapuram",
            "Thrissur",
            "Wayanad"
         ]
      },
      {  
         "state":"Lakshadweep (UT)",
         "districts":[  
            "Agatti",
            "Amini",
            "Androth",
            "Bithra",
            "Chethlath",
            "Kavaratti",
            "Kadmath",
            "Kalpeni",
            "Kilthan",
            "Minicoy"
         ]
      },
      {  
         "state":"Madhya Pradesh",
         "districts":[  
            "Agar Malwa",
            "Alirajpur",
            "Anuppur",
            "Ashoknagar",
            "Balaghat",
            "Barwani",
            "Betul",
            "Bhind",
            "Bhopal",
            "Burhanpur",
            "Chhatarpur",
            "Chhindwara",
            "Damoh",
            "Datia",
            "Dewas",
            "Dhar",
            "Dindori",
            "Guna",
            "Gwalior",
            "Harda",
            "Hoshangabad",
            "Indore",
            "Jabalpur",
            "Jhabua",
            "Katni",
            "Khandwa",
            "Khargone",
            "Mandla",
            "Mandsaur",
            "Morena",
            "Narsinghpur",
            "Neemuch",
            "Panna",
            "Raisen",
            "Rajgarh",
            "Ratlam",
            "Rewa",
            "Sagar",
            "Satna",
            "Sehore",
            "Seoni",
            "Shahdol",
            "Shajapur",
            "Sheopur",
            "Shivpuri",
            "Sidhi",
            "Singrauli",
            "Tikamgarh",
            "Ujjain",
            "Umaria",
            "Vidisha"
         ]
      },
      {  
         "state":"Maharashtra",
         "districts":[  
            "Ahmednagar",
            "Akola",
            "Amravati",
            "Aurangabad",
            "Beed",
            "Bhandara",
            "Buldhana",
            "Chandrapur",
            "Dhule",
            "Gadchiroli",
            "Gondia",
            "Hingoli",
            "Jalgaon",
            "Jalna",
            "Kolhapur",
            "Latur",
            "Mumbai City",
            "Mumbai Suburban",
            "Nagpur",
            "Nanded",
            "Nandurbar",
            "Nashik",
            "Osmanabad",
            "Palghar",
            "Parbhani",
            "Pune",
            "Raigad",
            "Ratnagiri",
            "Sangli",
            "Satara",
            "Sindhudurg",
            "Solapur",
            "Thane",
            "Wardha",
            "Washim",
            "Yavatmal"
         ]
      },
      {  
         "state":"Manipur",
         "districts":[  
            "Bishnupur",
            "Chandel",
            "Churachandpur",
            "Imphal East",
            "Imphal West",
            "Jiribam",
            "Kakching",
            "Kamjong",
            "Kangpokpi",
            "Noney",
            "Pherzawl",
            "Senapati",
            "Tamenglong",
            "Tengnoupal",
            "Thoubal",
            "Ukhrul"
         ]
      },
      {  
         "state":"Meghalaya",
         "districts":[  
            "East Garo Hills",
            "East Jaintia Hills",
            "East Khasi Hills",
            "North Garo Hills",
            "Ri Bhoi",
            "South Garo Hills",
            "South West Garo Hills ",
            "South West Khasi Hills",
            "West Garo Hills",
            "West Jaintia Hills",
            "West Khasi Hills"
         ]
      },
      {  
         "state":"Mizoram",
         "districts":[  
            "Aizawl",
            "Champhai",
            "Kolasib",
            "Lawngtlai",
            "Lunglei",
            "Mamit",
            "Saiha",
            "Serchhip"
         ]
      },
      {  
         "state":"Nagaland",
         "districts":[  
            "Dimapur",
            "Kiphire",
            "Kohima",
            "Longleng",
            "Mokokchung",
            "Mon",
            "Peren",
            "Phek",
            "Tuensang",
            "Wokha",
            "Zunheboto"
         ]
      },
      {  
         "state":"Odisha",
         "districts":[  
            "Angul",
            "Balangir",
            "Balasore",
            "Bargarh",
            "Bhadrak",
            "Boudh",
            "Cuttack",
            "Deogarh",
            "Dhenkanal",
            "Gajapati",
            "Ganjam",
            "Jagatsinghapur",
            "Jajpur",
            "Jharsuguda",
            "Kalahandi",
            "Kandhamal",
            "Kendrapara",
            "Kendujhar (Keonjhar)",
            "Khordha",
            "Koraput",
            "Malkangiri",
            "Mayurbhanj",
            "Nabarangpur",
            "Nayagarh",
            "Nuapada",
            "Puri",
            "Rayagada",
            "Sambalpur",
            "Sonepur",
            "Sundargarh"
         ]
      },
      {  
         "state":"Puducherry (UT)",
         "districts":[  
            "Karaikal",
            "Mahe",
            "Pondicherry",
            "Yanam"
         ]
      },
      {  
         "state":"Punjab",
         "districts":[  
            "Amritsar",
            "Barnala",
            "Bathinda",
            "Faridkot",
            "Fatehgarh Sahib",
            "Fazilka",
            "Ferozepur",
            "Gurdaspur",
            "Hoshiarpur",
            "Jalandhar",
            "Kapurthala",
            "Ludhiana",
            "Mansa",
            "Moga",
            "Muktsar",
            "Nawanshahr (Shahid Bhagat Singh Nagar)",
            "Pathankot",
            "Patiala",
            "Rupnagar",
            "Sahibzada Ajit Singh Nagar (Mohali)",
            "Sangrur",
            "Tarn Taran"
         ]
      },
      {  
         "state":"Rajasthan",
         "districts":[  
            "Ajmer",
            "Alwar",
            "Banswara",
            "Baran",
            "Barmer",
            "Bharatpur",
            "Bhilwara",
            "Bikaner",
            "Bundi",
            "Chittorgarh",
            "Churu",
            "Dausa",
            "Dholpur",
            "Dungarpur",
            "Hanumangarh",
            "Jaipur",
            "Jaisalmer",
            "Jalore",
            "Jhalawar",
            "Jhunjhunu",
            "Jodhpur",
            "Karauli",
            "Kota",
            "Nagaur",
            "Pali",
            "Pratapgarh",
            "Rajsamand",
            "Sawai Madhopur",
            "Sikar",
            "Sirohi",
            "Sri Ganganagar",
            "Tonk",
            "Udaipur"
         ]
      },
      {  
         "state":"Sikkim",
         "districts":[  
            "East Sikkim",
            "North Sikkim",
            "South Sikkim",
            "West Sikkim"
         ]
      },
      {  
         "state":"Tamil Nadu",
         "districts":[  
            "Ariyalur",
            "Chennai",
            "Coimbatore",
            "Cuddalore",
            "Dharmapuri",
            "Dindigul",
            "Erode",
            "Kanchipuram",
            "Kanyakumari",
            "Karur",
            "Krishnagiri",
            "Madurai",
            "Nagapattinam",
            "Namakkal",
            "Nilgiris",
            "Perambalur",
            "Pudukkottai",
            "Ramanathapuram",
            "Salem",
            "Sivaganga",
            "Thanjavur",
            "Theni",
            "Thoothukudi (Tuticorin)",
            "Tiruchirappalli",
            "Tirunelveli",
            "Tiruppur",
            "Tiruvallur",
            "Tiruvannamalai",
            "Tiruvarur",
            "Vellore",
            "Viluppuram",
            "Virudhunagar"
         ]
      },
      {  
         "state":"Telangana",
         "districts":[  
            "Adilabad",
            "Bhadradri Kothagudem",
            "Hyderabad",
            "Jagtial",
            "Jangaon",
            "Jayashankar Bhoopalpally",
            "Jogulamba Gadwal",
            "Kamareddy",
            "Karimnagar",
            "Khammam",
            "Komaram Bheem Asifabad",
            "Mahabubabad",
            "Mahabubnagar",
            "Mancherial",
            "Medak",
            "Medchal",
            "Nagarkurnool",
            "Nalgonda",
            "Nirmal",
            "Nizamabad",
            "Peddapalli",
            "Rajanna Sircilla",
            "Rangareddy",
            "Sangareddy",
            "Siddipet",
            "Suryapet",
            "Vikarabad",
            "Wanaparthy",
            "Warangal (Rural)",
            "Warangal (Urban)",
            "Yadadri Bhuvanagiri"
         ]
      },
      {  
         "state":"Tripura",
         "districts":[  
            "Dhalai",
            "Gomati",
            "Khowai",
            "North Tripura",
            "Sepahijala",
            "South Tripura",
            "Unakoti",
            "West Tripura"
         ]
      },
      {  
         "state":"Uttarakhand",
         "districts":[  
            "Almora",
            "Bageshwar",
            "Chamoli",
            "Champawat",
            "Dehradun",
            "Haridwar",
            "Nainital",
            "Pauri Garhwal",
            "Pithoragarh",
            "Rudraprayag",
            "Tehri Garhwal",
            "Udham Singh Nagar",
            "Uttarkashi"
         ]
      },
      {  
         "state":"Uttar Pradesh",
         "districts":[  
            "Agra",
            "Aligarh",
            "Allahabad",
            "Ambedkar Nagar",
            "Amethi (Chatrapati Sahuji Mahraj Nagar)",
            "Amroha (J.P. Nagar)",
            "Auraiya",
            "Azamgarh",
            "Baghpat",
            "Bahraich",
            "Ballia",
            "Balrampur",
            "Banda",
            "Barabanki",
            "Bareilly",
            "Basti",
            "Bhadohi",
            "Bijnor",
            "Budaun",
            "Bulandshahr",
            "Chandauli",
            "Chitrakoot",
            "Deoria",
            "Etah",
            "Etawah",
            "Faizabad",
            "Farrukhabad",
            "Fatehpur",
            "Firozabad",
            "Gautam Buddha Nagar",
            "Ghaziabad",
            "Ghazipur",
            "Gonda",
            "Gorakhpur",
            "Hamirpur",
            "Hapur (Panchsheel Nagar)",
            "Hardoi",
            "Hathras",
            "Jalaun",
            "Jaunpur",
            "Jhansi",
            "Kannauj",
            "Kanpur Dehat",
            "Kanpur Nagar",
            "Kanshiram Nagar (Kasganj)",
            "Kaushambi",
            "Kushinagar (Padrauna)",
            "Lakhimpur - Kheri",
            "Lalitpur",
            "Lucknow",
            "Maharajganj",
            "Mahoba",
            "Mainpuri",
            "Mathura",
            "Mau",
            "Meerut",
            "Mirzapur",
            "Moradabad",
            "Muzaffarnagar",
            "Pilibhit",
            "Pratapgarh",
            "RaeBareli",
            "Rampur",
            "Saharanpur",
            "Sambhal (Bhim Nagar)",
            "Sant Kabir Nagar",
            "Shahjahanpur",
            "Shamali (Prabuddh Nagar)",
            "Shravasti",
            "Siddharth Nagar",
            "Sitapur",
            "Sonbhadra",
            "Sultanpur",
            "Unnao",
            "Varanasi"
         ]
      },
      {  
         "state":"West Bengal",
         "districts":[  
            "Alipurduar",
            "Bankura",
            "Birbhum",
            "Burdwan (Bardhaman)",
            "Cooch Behar",
            "Dakshin Dinajpur (South Dinajpur)",
            "Darjeeling",
            "Hooghly",
            "Howrah",
            "Jalpaiguri",
            "Kalimpong",
            "Kolkata",
            "Malda",
            "Murshidabad",
            "Nadia",
            "North 24 Parganas",
            "Paschim Medinipur (West Medinipur)",
            "Purba Medinipur (East Medinipur)",
            "Purulia",
            "South 24 Parganas",
            "Uttar Dinajpur (North Dinajpur)"
         ]
      }
  ];

  sowTime: Array<any> = [
    "Jan (Mid)",
    "Jan (End)",
    "Feb (Mid)",
    "Feb (End)",
    "Mar (Mid)",
    "Mar (End)",
    "Apr (Mid)",
    "Apr (End)",
    "May (Mid)",
    "May (End)",
    "Jun (Mid)",
    "Jun (End)",
    "Jul (Mid)",
    "Jul (End)",
    "Aug (Mid)",
    "Aug (End)",
    "Sep (Mid)",
    "Sep (End)",
    "Oct (Mid)",
    "Oct (End)",
    "Nov (Mid)",
    "Nov (End)",
    "Dec (Mid)",
    "Dec (End)"
  ]

  Kharif = [
    "Apr (End)",
    "May (Mid)",
    "May (End)",
    "Jun (Mid)",
    "Jun (End)",
    "Jul (Mid)",
    "Jul (End)",
    "Aug (Mid)",
    "Aug (End)",
    "Sep (Mid)",
    "Sep (End)",
    "Oct (Mid)",
    "Oct (End)",]

    Rabi = [
    "Jan (Mid)",
    "Jan (End)",
    "Feb (Mid)",
    "Feb (End)",
    "Mar (Mid)",
    "Mar (End)",
    "Apr (Mid)",
    "Nov (Mid)",
    "Nov (End)",
    "Dec (Mid)",
    "Dec (End)"]

  districts: Array<any>;
  changeState(state) {
    this.districts = this.stateList.find(sL => sL.state == state).districts;
  }

  produceData = [];
  priceData = [];

  produceColumnDefs = [
    {  field:'Crop' , filter: true},
    { field: 'Production', filter: true }
  ];
  produceRowData = [];

  priceColumnDefs = [
    {  field:'Crop', filter: true },
    {  field:'modalPrice', filter: true },
  ];


  priceRowData = [];

  topPriceRowData = [];
  topProduceRowData = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.growForm = new FormGroup({
      selState : new FormControl('', Validators.required), 
      selDist : new FormControl('', Validators.required), 
      sowingPeriod: new FormControl('', Validators.required),
      sowingYear: new FormControl('')
    });

    this.getJSON().subscribe(data => {
      console.log("Crop data: " + data.length)

      this.masterData = data;

      for(let i=0; i<this.masterData.length; ++i) {
        this.masterData[i]["modalPrice"] = Math.round(Math.random() * 500);
      }
  
      // console.log("All data: " + JSON.stringify(this.masterData))
  
    });
  }


  getJSON(): Observable<any> {
    return this.http.get("./assets/crop_data.json")
  }  

  submit() {
    console.log('Clicked submit');
    console.log(this.growForm.value);

    this.filterData = [];

    let district = this.growForm.value.selDist.toUpperCase();
    let sowingPeriod = this.growForm.value.sowingPeriod;
    let toggleSeason;
    
    if(this.Kharif.includes(sowingPeriod)) {
      toggleSeason = 'Rabi';
    } else {
      toggleSeason = 'Kharif';
    }

  
    console.log('Selected District: ' + district)

    this.filterData = this.masterData.filter(obj => {
      return (obj.District === district  && obj.Year === '2021' && !obj.Season.startsWith(toggleSeason) );
    })

    console.log("Len of filter: ", this.filterData.length)
    console.log("Filter data: " + JSON.stringify(this.filterData))

    let cropData = [];

    for(let i=0; i<this.filterData.length; ++i) {
        let data = {
          "Crop": this.filterData[i].Crop,
          "modalPrice": this.filterData[i].modalPrice,
          "Production": this.filterData[i].Production
        }

        cropData.push(data);
    }

    console.log("Transformed Data: " + JSON.stringify(cropData))

    this.produceData = [...cropData];
    this.priceData = [...cropData];

    this.produceData.sort( (a,b) => {
      return (a.Production > b.Production) ? 1 : -1;
    });

    this.priceData.sort( (a,b) =>  {
      return (a.modalPrice > b.modalPrice) ? 1 : -1;
    });

    for(let i=0; i<this.filterData.length; ++i) {
      let data = {
        "Crop": this.filterData[i].Crop,
        "modalPrice": this.filterData[i].modalPrice,
        "Production": this.filterData[i].Production
      }

      cropData.push(data);
  }

    /****** sort logic ends */

    console.log('Produce data: ' + JSON.stringify(this.produceData) )
    console.log('Price data: ' + JSON.stringify(this.priceData) )

    this.topPriceRowData = [];
    this.topProduceRowData = [];

    for(let i=0; i<this.produceData.length; ++i) {

      if(i == 5) {
        break;
      } else {
        this.topProduceRowData.push(this.produceData[i])
      }
    }

    for(let i=0; i<this.priceData.length; ++i) {

      if(i == 5) {
        break;
      } else {
        this.topPriceRowData.push(this.priceData[i])
      }
    }

    this.topProduceRowData.sort( (a,b) => {
      return (parseInt(a.Production) > parseInt(b.Production) ) ? -1 : 1;
    });

    this.topPriceRowData.sort( (a,b) =>  {
      return (a.modalPrice > b.modalPrice) ? -1 : 1;
    });

    let priceBarData = [];
    let priceBarLabel = [];

    for(let i=0; i<this.topPriceRowData.length; ++i) {
      priceBarData.push(this.topPriceRowData[i].modalPrice)
      priceBarLabel.push(this.topPriceRowData[i].Crop)
    }

    this.priceChartData = [{
      label: 'Daily Mandi Price (Per Quintal)',
      data: priceBarData,
      borderWidth: 1,
      fill: false
    }];
  
    this.priceChartLabels = priceBarLabel;

    let produceBarData = [];
    let produceBarLabel = [];

    for(let i=0; i<this.topProduceRowData.length; ++i) {
      produceBarData.push(this.topProduceRowData[i].Production)
      produceBarLabel.push(this.topProduceRowData[i].Crop)
    }

    this.produceChartData = [{
      label: 'Production (In Acres)',
      data: produceBarData,
      borderWidth: 1,
      fill: false
    }];
  
    this.produceChartLabels = produceBarLabel;

    this.submitClicked = true;

    this.clearAll();
  }

  clearAll() {
    this.growForm.reset();
  }


}

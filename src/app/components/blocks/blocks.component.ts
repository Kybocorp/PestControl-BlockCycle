import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { query } from '@angular/core/src/animation/dsl';
declare let $;

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  title: string;
  subtitle: string;
  page2 = 1;
  blockCycles: any;
  tempArr = [];
  blocksArray = [];
  date;
  arr = [];
  dropDownValue;
  blockCycleId;
  sub;
  blocksList;
  searchQuery;
  dates = [];
  selectedDateIndex: string;
  selectedIndex: number;
  checked: boolean = true;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
    this.title = "Blank Page title";
    this.subtitle = "This is some text within a card block."

  }


  ngOnInit() {
    this.componentInitData();
  }



  // ============================================================== 
  //                BLOCK  COMPONENT INITIAL DATA
  // ==============================================================

  componentInitData() {
    $('#exampl2').datepicker({
      autoclose: true,
      todayHighlight: true,
      format: 'dd/mm/yyyy'
    });


    setTimeout(() => {
      $(".footable").footable();
    }, 2000);

    this.sub = this.route
      .queryParams
      .subscribe(params => {

        this.blockCycleId = +params['blockCycleId'] || -1;


        this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycleId)
          .map(res => res.json())
          .subscribe(data => {
            this.blocksArray = data;
            setTimeout(() => {
              for (let i = 0; i < this.blocksArray.length; ++i) {

                let id = "#example" + i;
                $(id).datepicker({
                  autoclose: true,
                  todayHighlight: true,
                  format: 'dd/mm/yyyy'
                }).on('show', (e) => {

                }).on('hide', (e) => {

                  if (this.checked) {

                    $(`#example${this.selectedIndex}`).val(this.dates[this.selectedIndex].id)
                  }
                  this.checked = true;


                }).on('changeDate', (e) => {
                  this.checked = false;
                  this.dates[this.selectedIndex].id = $(`#example${this.selectedIndex}`).val()

                })

                let abc: any = this.blocksArray[i].startDate;

                let yy = abc.slice(0, 4);
                let mm = abc.slice(5, 7);
                let dd = abc.slice(8, 10);
                let newDate = "" + dd + "/" + mm + "/" + yy;
                this.dates.push({ id: newDate })
                $(id).val(newDate);

              }
            }, 100);
          });


        this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/GetUnassigned/' + this.blockCycleId)
          .map(res => res.json())
          .subscribe(data => {
            this.blocksList = data;
          })


      });



    // data.map((data) => {
    //   data['blockCycleId'] = this.blockCycles[i].blockCycleId
    // })
    // this.blocksArray = [...this.blocksArray, ...data];


    //====================================================
    //    CLIENT ASK US TO CHANGE BUT THIS IS STABLE CODE
    //====================================================
    // this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/BlockCycle/Get')

    //   .subscribe(data => {
    //     this.blockCycles = data.json();
    //     for (let i = 0; i < this.blockCycles.length; ++i) {

    //       this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycles[i].blockCycleId)
    //         .map(res => res.json())
    //         .subscribe(data => {
    //           data.map((data) => {
    //             data['blockCycleId'] = this.blockCycles[i].blockCycleId
    //           })
    //           this.blocksArray = [...this.blocksArray, ...data];
    //         });
    //     }
    //   });

    //=====================================================
  }



  // ============================================================== 
  //          BLOCK  COMPONENT NAVIGATION TO PROPERTIES PAGE
  // ==============================================================


  goToPage(data) {
    this.router.navigate(['/properties'], { queryParams: { blockCycleId: this.blockCycleId, blockId: data.blockId } });
  }

  temp(index) {
    let id = "#example" + index;
    this.selectedDateIndex = id;
    this.selectedIndex = index;
    //$(id).val(this.dates[index]);

  }

  // ============================================================== 
  //            THIS FUCNTION WILL SEND DATA TO API
  // ==============================================================



  save() {

    let date = $("#exampl2").val();
    let url = "http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/AddBlockToBlockCycle";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    // const headerDict = {
    //   'Content-Type': ',application/x-www-form-urlencoded,application/json',
    //   'Accept': 'application/json,application/x-www-form-urlencoded',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }

    // const requestOptions = {
    //   headers: new Headers(headerDict),
    // };


    let dd = date.slice(0, 2);
    let mm = date.slice(3, 5);
    let yy = date.slice(6, 10);
    let newDate = "" + mm + "/" + dd + "/" + yy;

    let _body = {
      "blockCycleId": this.blockCycleId,
      "blockId": this.dropDownValue.blockId,
      "startDate": newDate
    }

    let body = JSON.stringify(_body);

    this.http.post(url, body, options)
      .map(res => res.json())
      .subscribe(data => {
        //console.log(data);
        //this.blocksArray.push(data)
        this.componentInitData();
        $('exampl2').datepicker({
          autoclose: true,
          todayHighlight: true,
          format: 'dd/mm/yyyy'
        })
        
      })

  }

  searchQueryMethod() {


    setTimeout(() => {
      for (let i = 0; i < this.blocksArray.length; ++i) {

        let id = "#example" + i;
        $(id).datepicker({
          autoclose: true,
          todayHighlight: true,
          format: 'dd/mm/yyyy'
        }).on('show', (e) => {

        }).on('hide', (e) => {

          if (this.checked) {

            $(`#example${this.selectedIndex}`).val(this.dates[this.selectedIndex].id)
          }
          this.checked = true;


        }).on('changeDate', (e) => {
          this.checked = false;
          this.dates[this.selectedIndex].id = $(`#example${this.selectedIndex}`).val()

        })

        let abc: any = this.blocksArray[i].startDate;

        let yy = abc.slice(0, 4);
        let mm = abc.slice(5, 7);
        let dd = abc.slice(8, 10);
        let newDate = "" + dd + "/" + mm + "/" + yy;
        this.dates.push({ id: newDate })
        $(id).val(newDate);

      }
    });

    setTimeout(() => {
      $('.footable-even').footable();
    }, 1000);
  }




}

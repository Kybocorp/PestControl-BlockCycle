
import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { logWarnings } from 'protractor/built/driverProviders';
import { Http, RequestOptions, Headers, RequestMethod, Jsonp } from '@angular/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare let $;


@Component({

    selector: 'app-add-block-cycle',
    templateUrl: './add-block-cycle.component.html',
    styleUrls: ['./add-block-cycle.component.css']
})
export class AddBlockCycleComponent implements OnInit {

    @Input('blockCycles') blockCycles: any;
    @Output() update = new EventEmitter<any>();

    tempArr = [];
    blocksArray: any = [];
    sendDataArr = []
    checkedArray = [];
    tempCheckedArray = [];
    addBlockCycleSendArr = [];
    date;
    body;
    arr = [];
    step2datesRecord = [];
    step2CurrentDateIndex;

    dateForm: FormGroup;
    testDate;

    @Output()
    change: EventEmitter<any> = new EventEmitter<any>();


    constructor(private http: Http, private fb: FormBuilder) {

    }

    ngOnInit() {
        this.componentInitData();
        this.createForm();
    }



    createForm() {
        this.dateForm = this.fb.group({

        });
    }

    //============================================================== 
    // SEND DATA TO SERVER ON FORM SUBMISSION
    // ==============================================================


    sendData() {


        for (let i = 0; i < this.checkedArray.length; ++i) {

            let tempDataHolder = {
                blockCycleId: this.checkedArray[i].blockCycleId,
                blockId: this.checkedArray[i].blockId,
                startDate: this.checkedArray[i].assignDate,
            }
            let dd = tempDataHolder.startDate.slice(0, 2);
            let mm = tempDataHolder.startDate.slice(3, 5);
            let yy = tempDataHolder.startDate.slice(6, 10);
            let newDate = "" + mm + "/" + dd + "/" + yy;

            tempDataHolder.startDate = newDate;
            this.addBlockCycleSendArr.push(tempDataHolder)

        }

        let date = $("#datepicker-autoclose").val();
        let dd = date.slice(0, 2);
        let mm = date.slice(3, 5);
        let yy = date.slice(6, 10);
        let newDate = "" + mm + "/" + dd + "/" + yy;

        //let tempDate = new Date(date);
        //console.log(tempDate instanceof Date);
        //tempDate.toISOString();
        //console.log(tempDate);
        let _body = {
            //"startDate": date,
            "startDate": newDate,
            "blocks": this.addBlockCycleSendArr
        }

        //console.log(_body);
        let body = JSON.stringify(_body);
        //console.log(body);
        
        $(() => {
            $('#add-contact').modal('toggle');
        });


        //  let headers = new Headers();
        // headers.append('Content-Type', 'application/json') // ... Set content type to JSON
        // let options = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        let options = new RequestOptions({ headers: headers });
        let url = 'http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/BlockCycle/Add';
        this.http.post(url, body, options)

            .subscribe(val => {
                //console.log(val);
                this.update.emit();
            },
            response => {
                //console.log(response);
            },
            () => {
            })


        for (let i = 0; i < this.blocksArray.length; ++i) {
            let id = "#box-" + i;
            $(id).prop("checked", false);
        }

        this.tempCheckedArray = [];
        this.checkedArray = [];
        this.step2datesRecord = [];
        this.testDate = "";

        setTimeout(() => {
            for (var i = 0; i < 3; i++) {
                $(".tab-wizard").steps("previous");
            }

        }, 1000);
    }



    //============================================================== 
    // ADD BLOCK COMPONENT INITIAL DATA
    // ==============================================================

    componentInitData() {
        // for (let i = 0; i < this.blockCycles.length; ++i) {
        //     this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycles[i].blockCycleId)
        //         .map(res => res.json())
        //         .subscribe(data => {
        //             data.map((data) => {
        //                 data['blockCycleId'] = this.blockCycles[i].blockCycleId
        //             })
        //             this.blocksArray = [...this.blocksArray, ...data];
        //         });
        // }


        this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/GetUnassigned/0')
            .map(res => res.json())
            .subscribe(data => {
                data.map((data) => {
                    data['blockCycleId'] = 0;
                })
                this.blocksArray = [...this.blocksArray, ...data];

            });


        $('#datepicker-autoclose').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'dd/mm/yyyy'
        })


        $('#sandbox-container .input-group.date').datepicker({
        });


        $(".tab-wizard").steps({
            headerTag: "h6"
            , bodyTag: "div"
            , transitionEffect: "fade"
            , titleTemplate: '<span class="step">#index#</span> #title#'
            , labels: {
                finish: "Submit"
            }
            , onFinished: () => {
                this.sendData();
            },

            onStepChanged: (event, currentIndex, priorIndex) => {

                if (currentIndex === 1) {
                    setTimeout(() => {
                        for (let i = 0; i < this.checkedArray.length; ++i) {

                            let id = "#example" + i;
                            $(id).datepicker({
                                autoclose: true,
                                todayHighlight: true,
                                format: 'dd/mm/yyyy'
                            })
                                .on('changeDate', (e) => {
                                    this.step2datesRecord[this.step2CurrentDateIndex] = $(`#example${this.step2CurrentDateIndex}`).val()
                                })

                            $(id).val(this.step2datesRecord[i])
                        }
                    }, 100);
                }

                if (currentIndex === 2) {
                    for (let i = 0; i < this.checkedArray.length; ++i) {
                        let id = "#example" + i;
                        let date = $(id).val();
                        this.checkedArray[i].assignDate = date;
                    }
                }
            }
        });



        setTimeout(() => {
            $(".footable").footable();
        }, 1000);
    }





    //============================================================== 
    // STEPER SECTION1 CHECKBOX  SELECTION
    // ==============================================================

    createSelection(Index) {

        let index = this.tempCheckedArray.indexOf(this.blocksArray[Index].blockId);
        if (index > -1) {
            this.tempCheckedArray.splice(index, 1);
            this.checkedArray.splice(index, 1);
            this.step2datesRecord.splice(index, 1);
        } else {
            let a = Object.assign({ assignDate: "" }, this.blocksArray[Index]);
            this.tempCheckedArray.push(this.blocksArray[Index].blockId);
            this.checkedArray.push(a);

        }
    }

    //============================================================== 
    // STEPER SECTION 2 DATE SELECTION
    // ==============================================================

    selectDate(index) {
        this.step2CurrentDateIndex = index;
    }


}

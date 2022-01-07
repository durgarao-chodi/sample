import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataQualityService } from './data-quality.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chartLabels:string[]=[];
  chartDataSets:any[]=[];
  reportData:any[]=[]
  showChart:boolean=true
  errorCode:any;
  displayedColumns: string[] =[];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  fontStyleControl = new FormControl();
  buttonLabels:any=[];
  columnName:any;
  public chartOptions:ChartConfiguration['options']={
    responsive:true,
      plugins:{
      legend:{
        display:true,
        position:'bottom'
      }
    }
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
            this.service.getReportData().subscribe(chartData=>{
              this.reportData=chartData;
              let dataSet:any[]=[];
              for(let data of chartData){
                this.chartLabels.push(data.errorMessage)
                dataSet.push(data.count)
              }
              this.chartDataSets.push({'data':dataSet})   
                      this.chart?.update();
                    },err=>{
        
                    })

          this.fontStyleControl.valueChanges.subscribe(data=>{
            let errorDetails=this.reportData.find(data=>data.errorMessage===this.fontStyleControl.value);
           this.viewData(errorDetails.errorCode);
          })
  } 
  
  constructor(private service:DataQualityService,private router:Router,private changeDetect:ChangeDetectorRef,private datepipe:DatePipe){
    this.router.routeReuseStrategy.shouldReuseRoute=function(){
      return false;
    }
  }
  
  public chartClicked(e:any):void{
    let errorMessage=this.chartLabels[e.active[0].index]
    let errorDetails=this.reportData.find(data=>data.errorMessage===errorMessage);
    this.showChart=!this.showChart;
    this.fontStyleControl.setValue(errorMessage);
    this.viewData(errorDetails.errorCode)
  }

  public viewData(errorCode:string){
    this.service.getViewData(errorCode).subscribe(data=>{
      this.displayedColumns= Object.keys(data[0])
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    },err=>{

    })
  }

  valueChanges(data:any){
    this.showChart=!this.showChart;
    this.fontStyleControl.setValue(data.value)
  }
  value(columnName:string,value:string){
  return columnName.includes('Date')?this.datepipe.transform(value,'yyyy-MM-dd HH:MM:ss'):value;
  }
}

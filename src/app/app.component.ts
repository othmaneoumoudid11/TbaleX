import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { Software } from './app.model';
import { ApiService } from './shared/api.service';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  formValue ! : FormGroup;
  softwareObj : Software = new Software();
  softwareData ! : any;
  showAdd ! : boolean;
  showUpdate ! : boolean;
  p: number = 1;
  term: any;
  constructor(private formbuilder: FormBuilder,private api : ApiService) {}

  title = 'Datatable';

  @ViewChild('dTable', {static: false}) dataTable: any;

  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).DataTable();
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      soft_ref : [''], 
      soft_manif : [''],
      soft_suppl : [''],
      soft_familly : [''],
      soft_version : [''],
      soft_Desc : ['']
    })
    this.getAllSoftwares();
  }

  clickAddSoftware(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  } 

  postSoftware(){
    this.softwareObj.soft_Desc = this.formValue.value.soft_Desc;
    this.softwareObj.soft_familly = this.formValue.value.soft_familly;
    this.softwareObj.soft_manif = this.formValue.value.soft_manif;
    this.softwareObj.soft_ref = this.formValue.value.soft_ref;
    this.softwareObj.soft_suppl = this.formValue.value.soft_suppl;
    this.softwareObj.soft_version = this.formValue.value.soft_version;
    this.softwareObj.imageUrl = 'xxx';
    
    this.api.addSoftware(this.softwareObj)
    .subscribe(res=>{
      console.log(res);
      alert("Software Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllSoftwares();
    },
    err=>{
      alert("something Went Wrong")
    })
    
  }

  getAllSoftwares() {
    this.api.getSoftwares()
    .subscribe(res=>{
      this.softwareData = res;
    })
  }

  deleteSoftware(row: any){
    this.api.deleteSoftware(row.id_software)
    .subscribe(res => {
      alert("Deleted succefully");
      this.getAllSoftwares();
    })

  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.softwareObj.id_software = row.id_software;
    this.formValue.controls['soft_ref'].setValue(row.soft_ref);
    this.formValue.controls['soft_manif'].setValue(row.soft_manif)
    this.formValue.controls['soft_suppl'].setValue(row.soft_suppl)
    this.formValue.controls['soft_familly'].setValue(row.soft_familly)
    this.formValue.controls['soft_version'].setValue(row.soft_version)
    this.formValue.controls['soft_Desc'].setValue(row.soft_Desc)
  }

  updateSoftware() {
    this.softwareObj.soft_Desc = this.formValue.value.soft_Desc;
    this.softwareObj.soft_familly = this.formValue.value.soft_familly;
    this.softwareObj.soft_manif = this.formValue.value.soft_manif;
    this.softwareObj.soft_ref = this.formValue.value.soft_ref;
    this.softwareObj.soft_suppl = this.formValue.value.soft_suppl;
    this.softwareObj.soft_version = this.formValue.value.soft_version;
    this.softwareObj.imageUrl = 'xxx';
    this.api.updateSoftware(this.softwareObj)
    .subscribe(res =>{
      alert("updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllSoftwares();
    })
  }

}

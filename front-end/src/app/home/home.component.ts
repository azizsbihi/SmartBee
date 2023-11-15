import { Component, OnInit } from '@angular/core';
import { cathalogue } from '../models/cathalogue';
import { CathalogueService } from '../cathalogueservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  mycathalogue?:cathalogue[];
  constructor(private service:CathalogueService,private router:Router){};
  ngOnInit()
  {
    this.service.getCathalogue().subscribe((data: cathalogue[])=>{
    this.mycathalogue=data
  })
 

}
}
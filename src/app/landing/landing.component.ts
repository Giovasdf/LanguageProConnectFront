import { VendorService } from './../services/vendor.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  vendors:any;

  constructor(public router: Router, private vendorService: VendorService) {
    this.getAllVendors();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  getAllVendors() {
    this.vendorService.getAllVendor().subscribe((vendors) => {
      this.vendors = vendors;
      console.log(this.vendors[0].languagesSpoken.name);

    });
  }

  sendEmail(email: string) {
    window.location.href = `mailto:${email}`;
  }


  sendWhatsApp(phone: number) {
      window.open(`https://wa.me/${phone}`, "_blank");
  }




}

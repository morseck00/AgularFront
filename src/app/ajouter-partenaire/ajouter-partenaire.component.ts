import { Component, OnInit } from '@angular/core';
import { AjouterpartenaireService } from '../ajouterpartenaire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-partenaire',
  templateUrl: './ajouter-partenaire.component.html',
  styleUrls: ['./ajouter-partenaire.component.css'],
  providers:[AjouterpartenaireService],
})
export class AjouterPartenaireComponent implements OnInit {
  imageUrl: string = "/assets/Images/user.png";
  fileToUpload: File = null;
  constructor(private ajoutpartService : AjouterpartenaireService,private router:Router) { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    //Show image preview
    var reader=new FileReader();
    
    reader.onload=(event:any)=> {
      this.imageUrl=event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
  }

    OnSubmit(username,prenom,nom,image,adresse,email,telephone,raisonSociale,ninea,password){
   this.ajoutpartService.postFile(
     username.value,
     prenom.value,
     nom.value,
     adresse.value,
     email.value,
     telephone.value,
     raisonSociale.value,
     ninea.value,
     password.value,
     this.fileToUpload).subscribe(
     data =>{
    prenom        = null; 
    nom           = null;
    adresse       = null;
    username      = null;
    password      = null;
    email         = null;
    raisonSociale = null;
    ninea         = null;
    telephone     = null;
    image         = null;
    this.imageUrl = "/assets/Images/user.png";
    this.router.navigateByUrl('/listepartenaire');
     }
   );
  }   
}

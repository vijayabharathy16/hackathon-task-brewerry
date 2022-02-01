var isEdit;
var currentid;
async function submitData(){
    try{
        if(isEdit==true){
            putData();
            isEdit=false;
        }else{
            postData();

        }
    
} catch(error) {
    console.log(error);
}

}
  

async function postData(){
    var formdata={
        FirstName : document.getElementById("firstName").Value,
        TypeName : document.getElementById("typeName").value,
        Gender : document.getElementById("gender").value,
        Address : document.getElementById("address").value,
        Websiteurl: document.getElementById("websiteurl").value,
        Phoneno : document.getElementById("phoneno").value

    }
    try{
        var postdata = await fetch("https://api.openbrewerydb.org/breweries",{
            method:"POST",
            body:JSON.stringify(formdata),
            header:{
                "content-type":"application/json"
            }
        })
        alert("Data Stored");
        getdata()
    }catch(error){
        alert("something went wrong");
    }
}
 async function getdata(){
     try{
         var datas=await fetch("https://api.openbrewerydb.org/breweries");
         var bat=await datas.json();
         console.log(bat);
         let tbody=document.getElementByI("tbody");
         
         tbody.innerText="";

         bat.forEach((data) => {
             var tr=document.createElement("tr");
             var idtd=document.createElement("td");
             idtd.innerText=data.id;

              var rowid=data.id;
              
               var FirstNametd=document.createElement("td");
               FirstNametd.innerText=data.FirstName;

               var TypeNametd=document.createElement("td");
               TypeNametd.innerText=data.TypeName;

                var Gendertd=document.createElement("td");
                Gendertd.innerText=data.Gender;

               var Addresstd=document.createElement("td");
               Addresstd.innerText=data.Address;

              var Websiteurl=document.createElement("td");
              Websiteurl.innerText=data.Websiteurl;

              var phoneno=document.createElement("td");
              phoneno.innerText=data.phoneno;

              var edit=document.createElement("td");
              var iedit=document.createElement("i");
              isEdit.append(iedit);

               iedit.setAttribute("class","fav fa-edit");
               iedit.addEventListener("click",async function(){
                   try{
                       var edata=await fetch("https://api.openbrewerydb.org/breweries"+rowid);
                       var editdata=await edata.json();
                       console.log(editdata);
                        currentid=editdata.id;
                    
                      document.getElementById("FirstName").value=editdata.FirstName;
                      document.getElementById("TypeName").value=editdata.TypeName;
                      document.getElementById("Gender"),value=editdata.Gender;
                      document.getElementById("Address").value=editdata.Address;
                      document.getElementById("Websiteurl").value=editdata.Websiteurl;
                      document.getElementById("Phoneno").value=editdata.Phoneno;
            
                   } catch (error){
                       console.log(error)
                   }
                   isEdit=true;
                });
                 var delet=document.createElement("td");
                 var idelet=document.createElement("i");
                 delet.append(idelet);
                  
                 idelet.setAttribute("class","fas fa-trash-alt");
                  idelet.addEventListener("click",async function(){

                  try{
                      fetch("https://api.openbrewerydb.org/breweries"+rowid,{
                          method:"DELETE"
                      })

                      alert("Data Delected");
                      getdata();
                  }catch(error){
                      console.log(error)
                  }
                
                })
                tr.appendChild(idtd);
                tr.appendChild(FirstNametd);
                 tr.appendChild(TypeNametd);
                 tr.appendChild(Gendertd);
                 tr.appendChild(Addresstd);
                 tr.appendChild(Website-urltd);
                 tr.appendChild(Phone-notd);
                 tr.appendChild(edit);
                 tr.appendChild(delet);
         
                 tbody.appendChild(tr)
            });

        }catch (error){
            alert("something went to wrong");
            console.log(error);
        }
    }

 getdata();
    
  async function putData(){
      var formdata={
          FirstName:document.getElementById("firstname").value,
          TypeName : document.getElementById("typeName").value,
          Address : document.getElementById("address").value,
          Websiteurl: document.getElementById("websiteurl").value,
          Phoneno : document.getElementById("phoneno").value

      }
      getdata();
      try {
          var putdata=await fetch("https://api.openbrewerydb.org/breweries"+currentid,{
              method:"PUT",
              body:JSON.stringify(formdata),
              header:{"content -type":"application/json"}
      })
      alert("Data Updated");
      getdata();
  }
    catch (error){
        console.log(error);
    }
}

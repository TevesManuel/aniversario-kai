let last_indice = null;
let phrases = null;
let set_phrase = () => {
    if(phrases != null)
    {
      let indice = null;
      if(indice != null)
      {
        indice = last_indice;
        while(Math.abs(indice - last_indice) < 3)
        {
          indice = Math.floor(Math.random() * ((phrases.split('\n').length)));
        }
        last_indice = indice;
      }
      else
      {
        indice = Math.floor(Math.random() * ((phrases.split('\n').length)));
      }
      if(indice % 2 != 0)
      {
        indice = indice - 1;
      }
      document.getElementById("frase").innerHTML = phrases.split('\n')[indice+1];
      document.getElementById("frasefrom").innerHTML = "- " + phrases.split('\n')[indice] + " -";
    }
    else
    {
      console.log("[!] Phrase not switched because not work phrases variable.")
    }
};
let date_difference_in_months = (first_date, last_date) => {
  return (last_date.getFullYear() - first_date.getFullYear()) * 12 + last_date.getMonth() - first_date.getMonth();
}
let date_difference_in_years = (first_date, last_date) => {
  return last_date.getFullYear() - first_date.getFullYear();
}
let setCookie = (name, value, days_to_expirate) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + (days_to_expirate * 24 * 60 * 60 * 1000));
  const expires = "expires=" + expirationDate.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}
let getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null; // La cookie no se encontró
}
let set_couple_days = () => 
{
  let current_date = new Date();
  current_date.setHours(0,0,0,0);
  document.getElementById("dayscounter").innerHTML = (/*1 +*/ Math.floor(( current_date - new Date("2025-04-17")) / (1000 * 60 * 60 * 24))).toString() + " dias siendo novios";
}
window.onload = () => {
  fetch("https://raw.githubusercontent.com/TevesManuel/aniversario-Kai/main/src/frases.txt")
  .then(response => {
    if (!response.ok)
    {
      throw new Error(`Error en la solicitud GET: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    phrases = data;
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });

  const date = new Date();

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  if(day == "17")
  {
    //mes aniversario
    document.getElementById("title-alert").innerHTML = "Feliz mes aniversario nro " + date_difference_in_months(new Date("2025-04-17"), new Date());

    if(month == "4")
    {
      //aniversario
      document.getElementById("title-alert").innerHTML = "Feliz aniversario nro " + date_difference_in_years(new Date("2025-04-17"), new Date());
    }
    if(day + "/" + month + "/" + year == "17/4/2025")
    {
      document.getElementById("title-alert").innerHTML = "Feliz primer mes";
    }
    if (decodeURIComponent(getCookie("last_view")) != day + "/" + month + "/" + year)
    {
      document.getElementById("alert").style.display = "flex";
    }
  }

  set_phrase();
  set_couple_days();
  
  document.getElementById('reload-button').onclick = () => {
    document.getElementById("reload-button").classList.toggle('rotate');
    set_phrase();
  };
  document.getElementById("close-alert").onclick = () => {
    setCookie("last_view", encodeURIComponent(day + "/" + month + "/" + year), 9999);
      document.getElementById("alert").style.display = "none";
  }
  document.getElementById("title").onclick = () => {
    document.getElementById("container").classList.add("open");
    document.getElementById("dayscounterdiv").style.display = "none";
  };
  document.getElementById("close").onclick = () => {
    document.getElementById("container").classList.remove("open");
    document.getElementById("dayscounterdiv").style.display = "flex";
  };
};
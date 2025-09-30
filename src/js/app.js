import { name } from "file-loader";
import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  Esta función se llama cada vez que el usuario cambia los tipos o cualquier entrada.
 * 
    {
        includeCover: true, // Si includeCover es verdadero, el algoritmo debería mostrar la imagen de portada.
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // posición de la barra de redes sociales (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("Estas son las variables actuales: ", variables); // print on the console
  // Aquí hacemos las preguntas lógicas para tomar decisiones sobre cómo construir el html.
  // if includeCover==false Luego restablecemos el código de la cubierta sin la etiqueta <img> para hacer que la cubierta sea transparente.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Restablecer el cuerpo del sitio web con la nueva salida HTML
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${variables.name == null ? "Nombre" : variables.name}</h1>
          <h2>${
            variables.lastName == null ? "Apellido" : variables.lastName
          }</h2>
          <h2>${variables.role == null ? "Puesto" : variables.role}</h2>
          <h3>${variables.city == null ? "Ciudad" : variables.city}</h3>
          <h3>${variables.country == null ? "Pais" : variables.country}</h3>
          <ul class="position-right">
            <li><a href="https://twitter.com/"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://github.com/"><i class="fab fa-github"></i></a></li>
            <li><a href="https://linkedin.com/"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="https://instagram.com/"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input////añadir un oyente a cada entrada
      const attribute = e.target.getAttribute("for"); // Cuando cualquier entrada cambia, recopila el valor
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // Renderizar nuevamente la tarjeta con nuevos valores
    });
  });
};

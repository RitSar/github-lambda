const fetchUser = async () => await(await fetch("/.netlify/functions/getuser")).json();
fetchUser().then(data => {
  if (data.name == "Error") {
    if (window.confirm('User was not found. Click OK to go back to input page.')) {
      window.location.href = '/';
    };
  }
  $("#profile_image").attr("src", data.avatar_url);
  if (data.name) {
    let $temp = $('<h3 id="username">Username</h3>');
    $(".container").append($temp);
    $("#username").text(data.name);
  }
  $("#name").text('@' + data.login);
  $("#name").attr('href', data.html_url);
  if (data.location) {
    let $temp = $('<div class="col s12 m4"><i class="fa fa-map-marker" aria-hidden="true"></i> <span id="location"></span></div>');
    $(".row1").append($temp);
    $("#location").text(data.location);
  }
  if (data.company) {
    let $temp = $('<div class="col s12 m4"><i class="fa fa-briefcase" aria-hidden="true"></i> <span id="company"></span></div>');
    $(".row1").append($temp);
    $("#company").text(data.company);
  }
  if (data.created_at) {
    const event = new Date(data.created_at);
    let $temp = $(`<div class="col s12 m4"><i class="fa fa-calendar" aria-hidden="true"></i> <span id="created">Joined on ${event.toString().slice(0, 15)}</span></div>`);
    $(".row1").append($temp);
  }

  $("#public_repos").text(data.public_repos);
  $("#followers").text(data.followers);
  $("#following").text(data.following);

  jQuery.each(data.repos, function(i, val) {
    let $temp = $(`<div class="col s12 m4 l2"><div class="card repo"><div class="card-content"><a href=${val.url} target="_blank"><span class="card-title">${val.name}</span></a><p>${val.description}</p></div><div class="card-action"><span>${val.language}</span><span><i class="fa fa-star" aria-hidden="true"></i> ${val.stars}</span><span><i class="fa fa-code-fork" aria-hidden="true"></i> ${val.forks}</span><span id="size">${val.size} kb</span></div></div></div>`);
    $(".row3").append($temp);
    if (i == 5 || i == val.length) 
      return false;
    }
  );
})

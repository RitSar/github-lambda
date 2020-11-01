const fetchUser = async () => await(await fetch("http://localhost:9000/getuser")).json();
fetchUser().then(data => {
  console.log(data);
  $("#profile_image").attr("src",data.avatar_url);
  $("#username").text(data.name);
  $("#name").text('@' + data.login);
  $("#name").attr('href',data.html_url);
  $("#location").text(data.location);
  $("#created").text(data.created_at);
  $("#public_repos").text(data.public_repos);
  $("#followers").text(data.followers);
  $("#following").text(data.following);
})

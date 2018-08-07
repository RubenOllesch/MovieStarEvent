chayns.ready.then(function () {
    var userName = "No user found. Log in to display your name here.";
    if (chayns.env.user.isAuthenticated) { //checks if an user is logged in
      userName = chayns.env.user.name; //storing the userName to a variable
      document.getElementById("titleQuestion").innerHTML = 'Bist du bereit, ' + userName + '?';
    }
});
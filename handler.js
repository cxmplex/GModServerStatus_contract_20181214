let host = 'http://127.0.0.1:54321';


function startServer() {
    console.log("Start button clicked!");
    let request = JSON.stringify({
        'type': 'start',
        'process_name': 'scrds.exe',
        'startup_path':'C:\\Users\\Administrator\\Desktop\\BMRP\\Start.bat'
    });
    fetch(host, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Content-Length': request.length
        },
        body: request}).
    then(response => response.status).then(statusCode => {
        if (statusCode === 200) {
            $('.StatusResponse').append("<P>The server was started!");
        } else {
            console.log("The server was not started");
            $('.StatusResponse').append("<P>The server was not started!");
        }
    }).catch(error => {
        $('.StatusResponse').append("<P>Error starting server!");
    });
}

$(document).ready(async function() {
   $('#StatusButton').click(() => {
       console.log("Status button clicked!");
       let request = JSON.stringify({
               'type': 'status',
               'process_name': 'scrds.exe',
               'startup_path':'C:\\Users\\Administrator\\Desktop\\BMRP\\Start.bat'});
       fetch(host, {
           method: "POST",
           body: request,
           mode: "no-cors",
           headers: {
               "Content-Type": "application/json; charset=utf-8",
               'Content-Length': request.length
           }
       }).then(response => response.status).then(statusCode => {
          if (statusCode !== 200) {
              $('.StatusResponse').replaceWith('<p>The Server is not started!<br><br><button class=\"btn btn-neutron\" id=\"StartButton\" style=\"margin-top: 5px;\">Start Server</button>');
              $('#StartButton').bind().click(startServer);
          } else {
              $('.StatusResponse').append("<P>The server is started!");
          }
       });
   });
});

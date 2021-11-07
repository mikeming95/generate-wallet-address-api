const publicKey = 
"-----BEGIN PUBLIC KEY----- "+
"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9Uv+SvG9xivmh+xvXRzhHae4W "+
"4YAw9fydfpwx1QKVGgLrMJWadCuEmZ0YZDM+Rq8S3xWyD++t7D5ajLap2qWfDJU2 "+
"c/p19THDYWtut0n4lIM5s8Id6Ql4pxAcdJb7Dpk9G5WoOjdkNbHVdXzVxpKv2X7G "+
"o3EZQNyJRYMyFX0yYwIDAQAB "+
"-----END PUBLIC KEY-----"
let encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKey);
        
$(function() {
    $("#generate-segwit-btn").click(function() {
        $('#segwit-address').attr("value",'');
        let jsontext=JSON.stringify({mnemonic:$('#mnemonic').val(),path:$('#path').val()})
        let encrypted = encrypt.encryptLong(jsontext);
        $.ajax({
            url: '/api/v1/address/seg-wit',
            contentType: "application/json",
            data:JSON.stringify({"data":encrypted}),
            type: 'post',
            success: function (msg) {
                $('#segwit-address').attr("value",msg.address)
            },
            error: function (xhr, textStatus, errorThrown) {
                let responseJson =JSON.parse(xhr.responseText);
                $('#segwit-address').attr("value",responseJson.message)
            }
        });
    });

    $("#generate-multi-sig-btn").click(function() {
        $('#multi-sig-address').attr("value",'');
        inputCount=document.getElementById("addresses-list").childElementCount;
        let addressList = new Array();
        for (let i=1;i<=inputCount;i++){
            addressList.push($('#address'+i).val())
        }
        let jsontext=JSON.stringify({addresses:addressList,m:parseInt($('#m').val()),n:parseInt($('#n').val())})
        let encrypted = encrypt.encryptLong(jsontext);
        $.ajax({
            url: '/api/v1/address/multi-sig',
            contentType: "application/json",
            data:JSON.stringify({data:encrypted}),
            type: 'post',
            success: function (msg) {
                $('#multi-sig-address').attr("value",msg.address)
            },
            error: function (xhr, textStatus, errorThrown) {
                let responseJson =JSON.parse(xhr.responseText);
                $('#multi-sig-address').attr("value",responseJson.message)
            }
        });

    });

    $("#n").bind('input propertychange', function() {
        let n =  $("#n").val()
        inputCount=document.getElementById("addresses-list").childElementCount;
        if (n >=1){
            if ((n-inputCount>=2) || (inputCount-n>=2)){
                $("#addresses-list").empty()
                for (let i=1;i<=n;i++){
                    $("#addresses-list").append('<div  id="address'+i+'-form" class="form-group"><label for="address'+i+'" class="col-sm-1 control-label">Address'+i+'</label><div class="col-sm-11"><input id="address'+i+'" type="text" class="form-control" value=""></div></div>')
                }
            }else{
                if (inputCount-n==1){
                    console.log(inputCount)
                    let str = "#address" + inputCount + "-form"
                    $(str).empty();
                }else if (n - inputCount==1){
                    let nextCount = inputCount + 1
                    $("#addresses-list").append('<div  id="address'+nextCount+'-form" class="form-group"><label for="address'+nextCount+'" class="col-sm-1 control-label">Address'+nextCount+'</label><div class="col-sm-11"><input id="address'+nextCount+'" type="text" class="form-control" value=""></div></div>')
                }

            }
        }
        
    })


});
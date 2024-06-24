import React from "react";
import $ from 'jquery'

export const UseJquery = () => {

    // function showResult(uploadResultArr) {
            
    //     var uploadUL = $("#uploadResult ul");
    //     var str = "";

    //     $(uploadResultArr).each(function(i, obj) {

    //         str += "<li data-name='" + obj.fileName + "' data-path='" + obj.folderPath + 
    //                 "' data-uuid='" + obj.uuid + "'>";
    //         str += " <div>";
    //         str += "<button type='button' data-file='" + obj.imageURL + "' "
    //         str += "class='btn-warning btn-sm'>X</button><br>";
    //         str += "<img src='/jquery/display?fileName=" + obj.thumbnailURL + "'>";
    //         str += "</div>";
    //         str += "</li>";        
    //     });
    //     uploadUL.append(str);
    // }

    // $("#uploadResult ").on("click", "li button", function(e) {
    //     console.log("delete file");
        
    //     var targetFile = $(this).data("file");
    //     var targetLi = $(this).closest("li");

    //     $.ajax({
    //         url: '/jquery/removeFile',
    //         data: {fileName: targetFile},
    //         dataType: 'text',
    //         type: 'POST',
    //         success: function(result) {
    //             alert(result);
    //             targetLi.remove();
    //         }
    //     });
    // });

    // $(".btn-primary").on("click", function(e) {
    //     e.preventDefault();

    //     var str = "";

    //     $(".uploadResult li").each(function(i, obj) {
    //         var target = $(obj);

    //         str += "<input type='hidden' name='imageDTOList["+i+"].imgName value='"+target.data('name') + "'>";
    //         str += "<input type='hidden' name='imageDTOList["+i+"].path value='"+target.data('path')+"'>";
    //         str += "<input type='hidden' name='imageDTOList["+i+"].uuid value='"+target.data('uuid')+"'>";
    //     });

    //     $(".box").html(str);
    //     $("form").submit();
    // });

    function showUploadedImages(arr) {

        console.log(arr);

        var divArea = $(".uploadResult");

        for(var i = 0; i < arr.length; i++) {

            divArea.append("<img src='/jquery/display?fileName=" + arr[i].imageURL + "'>");
        }
    }

    //$('#uploadBtn').on('click', function() {
    $(document).on('click', '#uploadBtn', function() {

        var formData = new FormData();

        var inputFile = $("input[type='file']");

        var files = inputFile[0].files;

        for(var i = 0; i < files.length; i++) {

            formData.append("uploadFiles", files[i]);
        }

        // 실제 업로드 부분
        // upload ajax
        $.ajax({
            url: 'http://localhost:8080/jquery/uploadAjax',
            processData: false,
            contentType: false,
            data: formData,
            type: 'POST',
            dataType: 'json',
            success: function(result) {
                // 나중에 화면 처리
                console.log("성공 :" +result);
                showUploadedImages(result);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    });

    return (
        <div>
            {/* <form action="/jquery/upload" method="post">
                <div class="form-group">
                    <h1>업로드 테스트</h1>
                </div>
                <div class="form-group fileForm">
                    <label>Image Files</label>
                    <div class="custom-file">
                        <input type="file" name="uploadFiles" multiple></input>
                        <label class="custom-file-label" data-browse="Browse"></label>
                    </div>
                </div> */}

                <div class="box">

                </div>
                <label for="file">Image Files</label>
                {/* <div class="custom-file">   */}
                <input type="file" id="file" name="uploadFiles" multiple>
                </input>
                {/* </div>       */}
                    <button id="uploadBtn" 
                        className="py-2 px-4 rounded-lg shadow-md text-white bg-blue-500">
                        Upload
                    </button>
                {/* </form>  */}

                <div class="uploadResult">
                    {/* <ul>

                </ul>   */}
            </div>

        </div>
    );
};

export default UseJquery;
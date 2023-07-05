import { useState, useEffect } from "react";
//import UploadService from "../services/UploadLogoService";
import ILogo from "../types/Logo";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { default as CloudUploadIcon } from "@mui/icons-material/CloudUpload";
import { IconButton } from "@mui/material";

interface ImageUploadProps {
  getUploadedImage: (logo: File) => void,
  hasSubmitted: boolean
}

export default function ImageUpload({ getUploadedImage, hasSubmitted}: ImageUploadProps) {
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLogo = event.target.files as FileList;
    setCurrentImage(selectedLogo?.[0]);
    setPreviewImage(URL.createObjectURL(selectedLogo?.[0]));

    event.preventDefault()
    const file = selectedLogo?.[0]
    
    getUploadedImage(file)
  };

/*
  const upload = () => {
    setProgress(0);
    if (!currentImage) return;

    UploadService.upload(currentImage, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getLogo();
      })
      .then((files) => {
        setImageInfos(files.data);
      })
      .catch((err) => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload this logo, try again.");
        }

        setCurrentImage(undefined);
      });
  };
*/
/*
  useEffect(() => {
    UploadService.getLogo().then((response) => {
      setImageInfos(response.data);
    });
  }, []);
*/
  useEffect(() => {
    if (hasSubmitted) {
      setCurrentImage(undefined);
      setPreviewImage("")
    }
  }, [hasSubmitted])
  return (
    <div>
      <input
        type="file"
        id="actual-btn"
        accept="image/*"
        onChange={selectImage}
        hidden
      />
      <IconButton>
        <Avatar
          sx={{ width: 50, height: 50, bgcolor: "#c889e4" }}
          variant="square"
        >
          <label htmlFor="actual-btn">
            {(!currentImage && <CloudUploadIcon />) ||
              (previewImage && (
                <img
                  style={{ width: "100%", height: "100%" }}
                  className="preview"
                  src={previewImage}
                  alt=""
                />
              ))}
          </label>
        </Avatar>
      </IconButton>
    </div>

    /*
        <div >
            <div className="row">
                <div className="col-8">
                    <label className="btn btn-default p-0">
                        <input type="file" accept="image/*" onChange={selectImage} />
                    </label>
                </div>

                <div className="col-4">
                    <button
                        className="btn btn-success btn-sm"
                        disabled={!currentImage}
                        onClick={upload}
                    >
                        Upload
                    </button>
                </div>
            </div>

            {currentImage && progress > 0 && (
                <div className="progress my-3">
                    <div
                        className="progress-bar progress-bar-info"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: progress + "%" }}
                    >
                        {progress}%
                    </div>
                </div>
            )}

            {previewImage && (
                <div>
                    <img className="preview" src={previewImage} alt="" />
                </div>
            )}

            {message && (
                <div className="alert alert-secondary mt-3" role="alert">
                    {message}
                </div>
            )}

            {imageInfos.length > 0 && (
                <div className="card mt-3">
                    <div className="card-header">List of Images</div>
                    <ul className="list-group list-group-flush">
                        {imageInfos.map((img, index) => (
                            <li className="list-group-item" key={index}>
                                <p>
                                    <a href={img.url}>{img.name}</a>
                                </p>
                                <StyledLogo src={img.url} alt={img.name} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
                        */
  );
};

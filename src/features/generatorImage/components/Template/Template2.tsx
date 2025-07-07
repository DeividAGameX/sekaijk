import {ImageProp} from "../../types/ImageProps";

function Template2({text1, text2, img1, img2}: ImageProp) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
            className="font-lato"
        >
            <picture
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <img
                    src={
                        img2
                            ? img2
                            : "https://res.cloudinary.com/sekai-jk/image/upload/v1737160145/Sekaijk/FondoPortada_qshzue_cywuzn.jpg"
                    }
                    alt=""
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </picture>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "gray",
                    opacity: 0.6,
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {img1 && (
                    <picture
                        style={{
                            top: "0",
                            right: "-75px",
                            position: "absolute",
                            display: "flex",
                            width: "650px",
                            height: "650px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            borderColor: "#d94862",
                            borderWidth: "5px",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            style={{
                                display: "flex",
                                flex: 1,
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                objectFit: "cover",
                                borderRadius: "50%",
                                borderWidth: "5px",
                                borderColor: "white",
                            }}
                            src={img1}
                            alt="Landscape picture"
                        />
                    </picture>
                )}
                <div
                    style={{
                        // flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "173px",
                        overflow: "hidden",
                        ...(img1
                            ? {
                                  position: "relative",
                                  justifyContent: "center",
                                  maxWidth: "600px",
                                  marginLeft: "100px",
                                  transform: "rotate(-5deg)",
                              }
                            : {}),
                    }}
                >
                    <h1
                        style={{
                            fontSize: "120px",
                            lineHeight: "90px",
                            fontFamily: '"Latos", sans-serif',
                        }}
                    >
                        {text1}
                    </h1>
                </div>
                {text2 && (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "-20px",
                        }}
                    >
                        <div
                            style={{
                                padding: "5px 20px",
                                textAlign: "center",
                                fontSize: "40px",
                                backgroundColor: "black",
                                fontFamily: '"Bebas Neue", sans-serif',
                                color: "white",
                                display: "flex",
                                ...(img1
                                    ? {
                                          position: "relative",
                                          justifyContent: "center",
                                          marginRight: "100px",
                                          transform: "rotate(-5deg)",
                                      }
                                    : {}),
                            }}
                        >
                            <p
                                style={{
                                    marginBottom: "10px",
                                    lineHeight: "0px",
                                }}
                            >
                                {text2}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#d94862",
                    position: "absolute",
                    top: "93%",
                    left: "20%",
                    transform: "rotate(-7deg)",
                    borderColor: "white",
                    borderWidth: "15px",
                }}
            />
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#d94862",
                    position: "absolute",
                    bottom: "93%",
                    right: "20%",
                    transform: "rotate(-7deg)",
                    borderColor: "white",
                    borderWidth: "15px",
                }}
            />
        </div>
    );
}

export default Template2;

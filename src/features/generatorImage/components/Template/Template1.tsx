import {ImageProp} from "../../types/ImageProps";

function Template1({text1, text2, img1, img2}: ImageProp) {
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
                    backgroundColor: "#d94862",
                    opacity: 0.7,
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />
            <div
                style={{
                    width: "100%",
                    height: "1200px",
                    backgroundColor: "white",
                    position: "absolute",
                    top: "15%",
                    left: "65%",
                    transform: "rotate(25deg)",
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
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {img1 && (
                    <picture
                        style={{
                            top: "0",
                            right: "0",
                            position: "absolute",
                            display: "flex",
                            width: "550px",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    >
                        <img
                            style={{
                                display: "flex",
                                flex: 1,
                                width: "550px",
                                height: "100%",
                                objectFit: "cover",
                            }}
                            src={img1}
                            alt="Landscape picture"
                        />
                    </picture>
                )}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                        height: "100%",
                        overflow: "hidden",
                        ...(img1
                            ? {
                                  position: "absolute",
                                  top: "0",
                                  left: "150px",
                                  maxWidth: "550px",
                              }
                            : {}),
                    }}
                >
                    <h1
                        style={{
                            maxWidth: "550px",
                            fontSize: "120px",
                            lineHeight: "90px",
                            marginBlockEnd: "5px",
                            fontFamily: '"Latos", sans-serif',
                        }}
                    >
                        {text1}
                    </h1>
                    {text2 && (
                        <div
                            style={{
                                padding: "5px 20px",
                                textAlign: "center",
                                fontSize: "40px",
                                backgroundColor: "black",
                                fontFamily: '"Bebas Neue", sans-serif',
                                color: "white",
                                display: "flex",
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default Template1;

import {ImageProp} from "../../types/ImageProps";

function Template3({text1, text2, img1, img2}: ImageProp) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                backgroundColor: "#0a0a0a",
            }}
            className="font-lato"
        >
            <div
                style={{
                    width: "630px",
                    height: "630px",
                    backgroundColor: "#d94862",
                    position: "absolute",
                    top: "0",
                    right: "-20%",
                    transform: "rotate(-45deg)",
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
                {(img2 || img1) && (
                    <div
                        style={{
                            top: "10px",
                            right: "0",
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            width: "550px",
                            height: "100%",
                            objectFit: "cover",
                            overflow: "hidden",
                            padding: "5px 20px",
                        }}
                    >
                        {img1 && (
                            <picture
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    padding: "5px 20px",
                                }}
                            >
                                <img
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        padding: "5px 20px",
                                        top: 0,
                                        left: 0,
                                        objectFit: "cover",
                                        ...(img2 && {
                                            maskImage: `url('${process.env.BASE_URL}/assets/Shapes/shape1.png')`,
                                            maskSize: "100% 100%",
                                            maskRepeat: "no-repeat",
                                        }),
                                        overflow: "hidden",
                                    }}
                                    src={img1}
                                    alt="Landscape picture"
                                />
                            </picture>
                        )}
                        {img2 && (
                            <picture
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    padding: "5px 20px",
                                }}
                            >
                                <img
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        padding: "5px 20px",
                                        top: "4px",
                                        left: "4px",
                                        objectFit: "cover",
                                        ...(img1 && {
                                            maskImage: `url('${process.env.BASE_URL}/assets/Shapes/shape2.png')`,
                                            maskSize: "100% 100%",
                                            maskRepeat: "no-repeat",
                                        }),
                                        overflow: "hidden",
                                    }}
                                    src={img2}
                                    alt="Landscape picture"
                                />
                            </picture>
                        )}
                    </div>
                )}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: "100%",
                        overflow: "hidden",
                        ...(img2 || img1
                            ? {
                                  position: "absolute",
                                  top: "0",
                                  left: "100px",
                                  maxWidth: "550px",
                              }
                            : {
                                  position: "relative",
                                  width: "100%",
                                  alignItems: "center",
                                  textAlign: "center",
                              }),
                    }}
                >
                    {text2 && (
                        // <div
                        //     style={{
                        //         padding: "5px 20px",
                        //         textAlign: "center",
                        //         fontSize: "40px",
                        //         backgroundColor: "black",
                        //         fontFamily: '"Bebas Neue", sans-serif',
                        //         color: "white",
                        //         display: "flex",
                        //     }}
                        // >
                        <p
                            style={{
                                lineHeight: "0px",
                                color: "#d94862",
                                fontSize: "40px",
                                fontStyle: "italic",
                                marginBottom: "-10px",
                            }}
                        >
                            {text2}
                        </p>
                        // </div>
                    )}
                    <h1
                        style={{
                            maxWidth: "550px",
                            fontSize: "120px",
                            lineHeight: "90px",
                            fontFamily: '"Latos", sans-serif',
                            color: "white",
                        }}
                    >
                        {text1}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Template3;

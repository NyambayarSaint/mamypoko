import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import checkLanguage from "@/miscs/checkLanguage";
import { MenuProvider } from "@/miscs/ContextMenuProvider";
import { ThemeProvider } from "styled-components";
import * as theme from "@/miscs/theme";
import TagManager from "react-gtm-module";

class MyApp extends App {
    state = {
        menu: {},
        networks: [],
        information: {},
        config: {},
        general: {},
        completelyLoaded: false,
        name: 'Mamy Poko',
        description: 'To be continued...',
        serverUrl:'http://admin-mn.mamypoko.mn',
        frontUrl: 'http://mamypoko.mn'
    };
    async componentDidMount() {
        const res = await checkLanguage(queryString, null);
        const config = {width: window.innerWidth, height: window.innerHeight};
        this.setState({ config, completelyLoaded: true, menu: res.data.menu.Menu, general: res.data.general});

        // GOOGLE TAG MANAGER
        const tagManagerArgs = { gtmId: "GTM-5GWNX89" };
        TagManager.initialize(tagManagerArgs);
    }

    render() {
        const { Component, pageProps, router } = this.props;
            return (
                <ThemeProvider theme={theme}>
                    <MenuProvider value={this.state}>
                        <AnimatePresence exitBeforeEnter>
                            <Component {...pageProps} key={router.route} />
                        </AnimatePresence>
                    </MenuProvider>
                </ThemeProvider>
            );
    }
}

export default MyApp;

const queryString = `
{
  menu{
    Menu{
      Title Path
    }
  }
  general{
    Logo{url formats}
    Logo2{url formats}
    SocialLinks{
      Facebook
      Twitter
      Instagram
      Google
    }
    FooterMenu{Title Path}
    Location
    Phone
    Email
  }
}
`;
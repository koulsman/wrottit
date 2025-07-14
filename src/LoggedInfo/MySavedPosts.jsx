import {useEffect, useRef, useState} from 'react';
import {loggedUser, loggedUserAtom} from '../Header/isLoggedIn';
import config from '../config';
import { Navbar } from '../NavBar/Navbar';
import {Grid} from '@mantine/core'
export default function MySavedPosts() {

    
    return (
        <>
        <Grid>
            <Grid.Col span={"3"}>
                <Navbar/>
                </Grid.Col>
            <Grid.Col span={"auto"}>
                <Navbar/>
                </Grid.Col>
                <Grid.Col span={"3"}>
                <Navbar/>
                </Grid.Col>
        </Grid>
        </>
    )
}
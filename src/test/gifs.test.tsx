import { GifApp } from '../components/gifs';
import { findByTestId, fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import * as ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '../store/store';
import { Provider } from 'react-redux';

describe('Gif Component test', () => {
    let container: HTMLDivElement;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <Provider store={configureStore()}>
                <GifApp />
            </Provider>
            , container);
    });
    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    });
    it('Renders correctly the gif component', () => {
        const pagination = container.querySelector('#gifPagination');
        expect(pagination).toBeInTheDocument();
    });
    it('Receives items from api call', async () => {
        const gifList = await (await screen.findByTestId('gifList'));
        expect(gifList).toBeInTheDocument();
    });
    it('Renders items from API', async () => {
        await waitFor(async () => {
            await screen.findByTestId('gifList').then(e => {
                console.log(e.childNodes.length);
                expect(e.childNodes.length).toBeGreaterThan(0);
            })
        });
    });
    describe('When user clicks on a different page...', async () => {
        let testImageUrl: string = '';
        beforeEach(async () => {
            await waitFor(async () => {
                await screen.findByTestId('gifList').then(e => {
                    const src = e.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('img')[0].src;
                    console.log('src', src);
                    testImageUrl = src;
                });
            });
            fireEvent.click(await screen.findByTestId('pagination').then(el => {
                const button2 = el.getElementsByTagName('ul')[0].getElementsByTagName('li')[2].getElementsByTagName('button')[0];
                console.log(button2.innerHTML.split('<')[0]);
                return button2;
            }), { button: 1 });
        });
        it('It changes the items inside the gifList', async () => {
            let newImageUrl: string = '';
            await waitFor(async () => {
                await screen.findByTestId('gifList').then(e => {
                    const newSrc = e.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('img')[0].src;
                    newImageUrl = newSrc;
                    return expect(newSrc).not.toBe(testImageUrl);
                });
            });
            expect(testImageUrl).not.toBe(newImageUrl);
        });
    });
    // describe('When user clicks on a gif item', () => {
    //     const randomNumber: number = Math.floor(Math.random() * 19);
    //     beforeEach(async () => {
    //         let imageToBeClicked: HTMLImageElement = document.createElement('img');
    //         console.log('randomNumber: ', randomNumber);
    //         await waitFor(async () => {
    //             await screen.findByTestId('gifList').then(e => {
    //                 console.log('dom', e.getElementsByTagName('div')[randomNumber]);
    //                 imageToBeClicked = e.getElementsByTagName('div')[randomNumber].getElementsByTagName('div')[0].getElementsByTagName('img')[0];
    //             });
    //         });
    //         fireEvent.click(imageToBeClicked, { button: 1 });
    //     });
    //     it('Preview component should show', async () => {
    //         expect(await screen.findByTestId('previewComponent').then(comp => comp)).toBeInTheDocument();
    //     })
    // });
});
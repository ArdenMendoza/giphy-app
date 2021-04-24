import React from 'react';
import { connect } from 'react-redux';
import { loadTrendingGifs } from '../store/actions';
import { IGiphyAppState } from '../store/store';
import { GiphyClient } from '../api/apiClient';
import { gif } from '../api/model';

interface Props {
}

interface ReduxStateProps {
    trendingGifs: gif[];
}

interface DispatchProps {
    loadTrendingGifs: (data: gif[]) => void;
}

const constantStyles = {
    container: {
        backgroundColor: 'rgb(246, 248, 250)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    } as React.CSSProperties,
    card: {
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: '5px',
        border: '1px solid rgb(236, 238, 240)',
        height: '300px',
    } as React.CSSProperties,
}

const GifAppDump: React.FunctionComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { trendingGifs, loadTrendingGifs } = props;
    const gifClient = new GiphyClient;

    const [pageNumber, setPageNumber] = React.useState(1);
    const [prevUrl, setPrevUrl] = React.useState('');

    React.useEffect(() => {
        const pageSize = 20;
        gifClient.getTrendingGifs(pageSize, pageNumber === 1 ? 0 : (pageNumber * pageSize) + 1).then(res => res.data && loadTrendingGifs(res.data));
    }, [pageNumber, navigator.userAgent]);

    const getColCountBasedOnDevice = () => {
        let colCount = 4;
        const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);
        const isTablet = /iPad/i.test(navigator.userAgent);
        console.log('isMobile: ', isMobile);
        console.log('isTablet: ', isTablet);
        if (isMobile) { colCount = 2; }
        if (isTablet) { colCount = 3; }
        return colCount;
    }

    const dynamicStyles = {
        cardContainer: {
            float: 'left',
            width: `calc((100% / ${getColCountBasedOnDevice()}) - 20px)`,
            height: '340px',
            padding: '10px 10px 0px 10px'
        } as React.CSSProperties
    }


    return <div style={constantStyles.container}>
        <div style={{ textAlign: 'center' }}>
            <button onClick={() => setPageNumber(pageNumber - 1)}>{'Previous Page'}</button>
            <span style={{ margin: '0px 10px' }}>{pageNumber}</span>
            <button onClick={() => setPageNumber(pageNumber + 1)}>{'Next Page'}</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex-grid', }}>
            {
                trendingGifs.map(tg => <div style={dynamicStyles.cardContainer}>
                    <div style={constantStyles.card}>
                        <img style={{ height: 'calc(100% - 25px)', width: '100%', cursor: 'pointer' }} src={`https://i.giphy.com/media/${tg.id}/giphy.webp`} onClick={() => setPrevUrl(`https://i.giphy.com/media/${tg.id}/giphy.webp`)} />
                        <div style={{ display: 'flex', color: '#888' }}>
                            <div style={{ flex: 1, textAlign: 'left', cursor: 'pointer' }}>
                                <a href={tg.url} style={{ textDecoration: 'none', color: '#888' }}>
                                    <i className={'fa fa-link'}></i>
                                </a>
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '11px' }}>
                                <span style={{ marginRight: '5px' }}><i style={{ marginRight: '3px' }} className={'fa fa-eye'}></i>{'1000'}</span>
                                <span style={{ marginRight: '5px' }}><i style={{ marginRight: '3px' }} className={'fa fa-comment'}></i>{'900'}</span>
                                <span style={{ marginRight: '5px' }}><i style={{ marginRight: '3px' }} className={'fa fa-heart'}></i>{'123'}</span>
                            </div>
                        </div>
                    </div>
                    {
                        tg.user?.avatar_url && <div style={{ marginLeft: '5px' }}>
                            <img src={tg.user?.avatar_url} style={{ height: '10px', width: '10px', borderRadius: '10px' }} />
                            <a href={tg.user.profile_url} style={{ marginLeft: '5px', fontSize: '10px', color: '#72b2ea', textDecoration: 'none' }}>{tg.username}</a>
                        </div>
                    }
                </div>
                )
            }
        </div>
        {prevUrl !== '' && <div style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', opacity: '0.7' }}></div>}
        {prevUrl !== '' && <div style={{ position: 'absolute', height: 'calc(100% - 400px)', padding: '200px 0px', width: '100%', textAlign: 'center' }} onClick={() => setPrevUrl('')}>
            <img src={prevUrl} style={{ height: '100%' }} />
        </div>}
    </div>
}

export const GifApp = connect<{}, DispatchProps, {}, IGiphyAppState>((state) => ({
    trendingGifs: state.gifs.trendingGifs
}), dispatch => ({
    loadTrendingGifs: data => dispatch(loadTrendingGifs(data))
}))(GifAppDump);

// export default Layout;

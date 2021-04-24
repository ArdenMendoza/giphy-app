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

const GifAppDump: React.FunctionComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { trendingGifs, loadTrendingGifs } = props;
    const gifClient = new GiphyClient;

    const [pageNumber, setPageNumber] = React.useState(1);

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

    const styles = {
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
        cardContainer: {
            float: 'left',
            width: `calc((100% / ${getColCountBasedOnDevice()}) - 20px)`,
            padding: '10px'
        } as React.CSSProperties
    }


    return <div style={styles.container}>
        <div style={{ textAlign: 'center' }}>
            <button onClick={() => setPageNumber(pageNumber - 1)}>{'Previous Page'}</button>
            <span style={{ margin: '0px 10px' }}>{pageNumber}</span>
            <button onClick={() => setPageNumber(pageNumber + 1)}>{'Next Page'}</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex-grid', }}>
            {
                trendingGifs.map(tg => <div style={styles.cardContainer}>
                    <div style={styles.card}>
                        <img style={{ height: 'calc(100% - 25px)', width: '100%' }} src={`https://i.giphy.com/media/${tg.id}/giphy.webp`} />
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1, textAlign: 'left' }}>{'link icon here'}</div>
                            <div style={{ textAlign: 'right' }}>
                                <span>{'v'}</span>
                                <span>{'c'}</span>
                                <span>{'r'}</span>
                            </div>
                        </div>
                    </div>
                    {
                        tg.user?.avatar_url && <div>
                            <img src={tg.user?.avatar_url} style={{ height: '10px', width: '10px' }} />
                            <a href={tg.user.profile_url} style={{ marginLeft: '5px', fontSize: '10px', color: '#72b2ea', textDecoration: 'none' }}>{tg.username}</a>
                        </div>
                    }
                </div>
                )
            }
        </div>
    </div>
}

export const GifApp = connect<{}, DispatchProps, {}, IGiphyAppState>((state) => ({
    trendingGifs: state.gifs.trendingGifs
}), dispatch => ({
    loadTrendingGifs: data => dispatch(loadTrendingGifs(data))
}))(GifAppDump);

// export default Layout;

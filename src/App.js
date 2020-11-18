import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef } from 'react'
// import React, { useEffect , useRef } from 'react'
import { useState } from 'react'
// import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import KMeany from './kMeans'
import './App.css';

const initialState = [ 
    { name : 'Uno' ,
    _rgb : [200,9,88] ,
    _hex : '#bb231e' ,
    _population : '' ,
    _hsl : [200,9,88] } , {  
    name : 'Dos' ,
    _rgb : [200,99,8] ,
    _hex : '#aaa111' ,
    _population : 4000 ,
    _hsl : [200,9,88] }
]



const Tits = props => <h3>{ props.tit }</h3>

const Sepper = props => ( <><br /><br /><div style={ { height : props.ht * 10 + 'px' , borderTop : '1px black solid' } } /></>)

const Iputty = props => <input id="input_file" onChange={ props.onChange } type="file" ref={ props.reffy } />


function RenderImage ( props ) {
    var srcUrl = window.URL.createObjectURL( props.img )
    return <img src={ srcUrl } alt={ 'fuckface' } />
}


function TableyTable( props ) {
    console.log( props.title )

    var palette = props.calars;
    var sortPaletteBy = ( props.sortFields ) // ARRAY [ '_population' ]
        ? props.sortFields
        : [ '_population' , [ '_hsl' , 0 ] ]
    // palette.sort( ( a , b ) => b._population - a._population )
    // palette.sort( ( a , b ) => b._hsl[ 0 ] - a._hsl[ 0 ] )
    sortPaletteBy.forEach( ( sf , sfi ) => {
        if ( typeof sf === 'string' ) {
            // console.log( 'string >> ' + sf )
            palette.sort( ( a , b ) => b[ sf ] )
        } else if ( Array.isArray( sf ) ) {
            // console.log( 'array >> ' + sf )
            sf.forEach( ( sfarray , sfarrayi ) => { 
                palette.sort( ( a , b ) => b[ sf[ 0 ] ][ sf[ 1 ] ] - a[ sf[ 0 ] ][ sf[ 1 ] ] )
            } )
        } else {
            console.log( 'sorting is weird' )
        }
    } )
    var percenty = ( props.threshold ) ? props.threshold : .001;
    // var color = 'inherit';
    var pachanga = [ ]
    console.log( 'pal LENGGGGGTH : ' + palette.length )
    console.log( palette )

    palette.forEach( asdf => {
        if ( typeof asdf !== 'undefined' ) {
        if ( ( asdf._rgb[ 0 ] < 101 )
        && ( asdf._rgb[ 1 ] < 100 )
        && ( asdf._rgb[ 2 ] < 149 ) ) {
            asdf[ 'color' ] = 'white'
        } else {
            asdf[ 'color' ] = 'inherit'
        }
        if ( asdf._ht > percenty ) { 
            pachanga.push( asdf )
        }
    }
    } )

    var titty = ( props.title ) ? props.title : ''
    var used = [ ];
    var inc = 0;

    return(
        <Container>
            { titty }<br />
            { percenty + ' %' }
            {/* <br />
            <br /> */}
            <Row style={ {  backgroundColor : 'black' ,
                            color : 'white' ,
                            height : '30px' ,
                            lineHeight : '30px' } } >

                <Col>{ 'SWATCH NAME' }</Col>

                <Col>
                    <Row>
                        <Col>{ 'R' }
                        </Col>
                        <Col>{ 'G' }
                        </Col>
                        <Col>{ 'B' }
                        </Col>
                    </Row>
                </Col>

                <Col>{ 'POPULATION' }</Col>

                <Col>
                    <Row>
                        <Col>{ 'h' }
                        {/* <Col><Button className="sortHeader" onClick={ ()=>sortBy( '_hsl' , palette ) } >{ 'h' }</Button> */}
                        </Col>
                        <Col>{ 's' }
                        </Col>
                        <Col>{ 'l' }
                        </Col>
                    </Row>
                </Col>

                <Col>{ '% OF TOTAL' }</Col>
                
            </Row>

            { pachanga.map( ( asdf , asdf_i ) => {
                var boob = `rgb(${asdf._rgb.join( ',' ) })`
                var goob = '';
                function uniqueKey( keydee ) {
                    if ( !used.includes( keydee ) ) {
                        used.push( keydee )
                        return keydee
                    } else {
                        var tmpr = keydee + inc.toString( )
                        console.log( asdf_i + ' >> ' + palette.length + ' ' + tmpr )
                        inc ++;
                        return uniqueKey( tmpr )
                    }
                }
                goob = uniqueKey( boob )
                    
                return (
                    <Row 
                        key={ goob + 'keyeyKey'}
                        style={ {
                            backgroundColor : boob ,
                            height : asdf.__height + 'px' ,
                            lineHeight : '30px' ,
                            color : asdf.color
                        } }
                        >
                        <Col>
                            { asdf.name }
                        </Col>

                        <Col>
                            <Row>
                                <Col>{ asdf._rgb[ 0 ] }
                                </Col>
                                <Col>{ asdf._rgb[ 1 ] }
                                </Col>
                                <Col>{ asdf._rgb[ 2 ] }
                                </Col>
                            </Row>
                        </Col>

                        <Col>{ asdf._population }</Col>

                        <Col>
                            <Row>
                                <Col>{ ( asdf._hsl[ 0 ] * 100 ).toPrecision( 3 ) }
                                </Col>
                                <Col>{ ( asdf._hsl[ 1 ] * 100 ).toPrecision( 3 ) }
                                </Col>
                                <Col>{ ( asdf._hsl[ 2 ] * 100 ).toPrecision( 3 ) }
                                </Col>
                            </Row>
                        </Col>

                        <Col>{ asdf._ht.toPrecision( 3 ) }</Col>
                    </Row>
                    )
                } ) }
        </Container>
    )
}







export default function Plodes( props ) {

    var iput =                                  useRef( );
    var [ palette , setPalette ] =              useState( initialState )
    var [ filey , setFile ] =                   useState( 'natalia' )
    var [ userK , setUserK ] =                  useState( 3 )
    var [ primary , setPrimary ] =              useState( initialState )
    var [ outliers , setOutliers ] =            useState( initialState )
    var [ clusteredOs , setClusteredOs ] =      useState( initialState )
    var [ final , setFinal ] =                  useState( initialState )
    var [ primaryPOP , setPrimaryPOP ] =        useState( 4 )
    var [ secondaryPOP , setSecondaryPOP ] =    useState( .2 )


    function handleIputChange( e ) {

        setFile( 'natalia' )
        setOutliers( initialState )
        setClusteredOs( initialState )
        setFinal( initialState )

        console.log( e.target.files )

        var filePut = ( e.target.files.length > 0 )
            ? e.target.files[ 0 ]
            : 'natalia'
        
        setFiley( filePut )
    }



    async function setFiley( ev ) {

        setFile( ev )

        var oUrl =              window.URL.createObjectURL( ev )
        var initPalette =       await window.Vibrant.from( oUrl ).quality( 1 ).getPalette( )

        console.log( 'V III B rant' )
        console.log( initPalette )

        function checkArray( array ) {
            return ( array.length > 0 && typeof array[ 0 ] !== 'undefined' );
        }
        
        function filterByPop( array , pop ) {
            var passBack = [ ];
            if ( checkArray( array ) ) {
                array.forEach( el => { if ( el._ht > pop ) { passBack.push( el ) } } )
            }
            return passBack; }

        function onlyOneBlack( array , lumiVal ) {
            var alreadyLumi = false;
            var giveBack = [ ];
            if ( checkArray( array ) ) {
                array.forEach( asdf => {
                if ( asdf._hsl[ 2 ] < lumiVal ) {
                    if ( !alreadyLumi ) {
                        giveBack.push( asdf )
                        alreadyLumi = true;
                    }
                    } else {
                        giveBack.push( asdf )
                    }
                } )
            }
            return giveBack;
        }

        // REMOVE NULLs
        // ENSURE POPULATION PROP
        // ASSIGN NAME PROP
        // ENSURE ONLY ONE VIBRANT PALETTE
        // ADD SWATCH POP TO TOTAL POP
        function preparePalette( pal ) {
            var palKeys =           Object.keys( pal )
            var pHolderArray =      [ ];
            var tp =                0;
            var vibrantAlready =    false;
            if ( pal.length > 0 ) {
                palKeys.forEach( ipkey => {
                    if ( ( pal[ ipkey ] !== null ) && ( typeof pal[ ipkey ][ '_population' ] !== 'undefined' ) ) { 
                        pal[ ipkey ][ 'name' ] = ipkey;
                        if ( ipkey === 'Vibrant' ) {
                            if ( !vibrantAlready ) {
                                pHolderArray.push( pal[ ipkey ] )
                                vibrantAlready = true;
                            } else { return; }
                        } else { pHolderArray.push( pal[ ipkey ] ) }
                        tp += pal[ ipkey ]._population; } } )
                // ADD PERCENT OF TOTAL POPULATION PROP
                pHolderArray.forEach( ( asdf , sas ) => { pHolderArray[ sas ][ '_ht' ] = asdf._population / tp * 100 } )  
                // REMOVE DUPLICATE SWATCHES
                pHolderArray = pHolderArray.filter( function onlyUnique( value , index , self ) { return self.indexOf( value ) === index; } )
                console.log( tp )
            }
            return pHolderArray;
        }


        var preppedPalette = preparePalette( initPalette )

        // var preppedBlackPalette = onlyOneBlack( preppedPalette , .13 )

        var preppedFilteredPalette = filterByPop( preppedPalette , primaryPOP )
        // var preppedFilteredPalette = filterByPop( preppedBlackPalette , primaryPOP )
        
        console.log( preppedPalette )
        window[ 'paley' ] = preppedPalette;


        var northSouth =    .085;
        // var northSouth = .13;
        var prepOutliers =  [ ];

        function makeOutlierRanges( palar ) {
            var firstHue =      [ ];
            // SET RANGES TO DETERMINE OUTLIERS
            if ( checkArray( palar ) ) {
            palar.forEach( ( asdf , asdfi ) => {
                if ( asdf._ht > primaryPOP ) {
                    console.log( asdf._hsl[ 0 ] )
                    // SET RANGES TO DETERMINE OUTLIERS
                    if ( !asdf._hsl[ 0 ] == 0 ) {
                        console.log( 'ADDING RANGE (BC NOT === 0) >> ' )
                        console.log( asdf._hsl[ 0 ] - northSouth )
                        firstHue.push( [ asdf._hsl[ 0 ] - northSouth , asdf._hsl[ 0 ] + northSouth ] )  } } } )
            }
            return firstHue;
        }

        console.log( firstHue )
        // var firstHue = makeOutlierRanges( preppedPalette )
        var firstHue = makeOutlierRanges( preppedFilteredPalette )

        // PARSE OUT OUTLIERS THAT ARE WITHIN RANGE OF PRIMARIES
        if ( checkArray( preppedPalette ) ) {
            preppedPalette.forEach( ( asdf , asdfi ) => {
                var nope = 0;
                firstHue.forEach( fh => {
                    if ( asdf._hsl[ 0 ] > fh[ 0 ] && asdf._hsl[ 0 ] < fh[ 1 ] ) {nope ++;}
                    if ( ( asdf._hsl[ 0 ] + 1 ) > fh[ 0 ] && ( asdf._hsl[ 0 ] ) + 1 < fh[ 1 ] ) {nope ++;}
                    if ( ( asdf._hsl[ 0 ] - 1 ) > fh[ 0 ] && ( asdf._hsl[ 0 ] ) - 1 < fh[ 1 ] ) {nope ++;}
                } )
                if ( nope === 0 ) {
                    console.log( 'YEEEPPPP' )
                    console.log( asdf )
                    // NO BLACKS INTO OUTLIERS !!!!
                    // NO BLACKS ALLOWED !!!!
                    if ( !asdf._hsl[ 0 ] == 0.00 ) { prepOutliers.push( asdf ) } } } )
        }

        console.log( outliers )
        var primarilyInit = filterByPop( preppedPalette , primaryPOP )

        setOutliers( prepOutliers )

        // FINAL OUTLIER CLUSTERS
        function fsbtp( array0 ) {
            if ( checkArray( array0 ) ) {

                var filteredArray = [ ];

                function filterSelfByTopPop( array ) {
                    var topPoppers =    0;
                    var topHuey =       0;
                    var centroidSwatch;
                    array.forEach( el => { 
                        console.log( 'A>>> ' + el )
                        if ( el._population > topPoppers ) {
                            topPoppers =    el._population;
                            topHuey =       el._hsl[ 0 ];
                            centroidSwatch = el;
                        }
                    } )
                    filteredArray.push( centroidSwatch )
                    console.log( topHuey )
                    array.forEach( ell => {
                        if ( ( !ell._hsl[ 0 ] > topHuey - .02 ) && ( !ell._hsl[ 0 ] < topHuey + .02 ) ) {
                            filteredArray.push( ell )
                        }
                    } )
                    return [ filteredArray , centroidSwatch ];
                }
                filterSelfByTopPop( array0 )
            }
            return filteredArray;
        }

        var filteredOutliers = ( checkArray( prepOutliers ) )
        ? fsbtp( prepOutliers )
        : prepOutliers
        console.log( filteredOutliers )


   


        var finalPalette = onlyOneBlack( [ ...preppedFilteredPalette , ...filteredOutliers ] , .13 )
        // var finalPalette = [ ...filterByPop( preppedPalette , 8 ) , ...filteredOutliers ]
        // console.log( finalPalette )
        setClusteredOs( filteredOutliers )

        setFinal( finalPalette )
        setPrimary( primarilyInit )
        setPalette( preppedPalette )
    }

    async function handleTheDropDown( evy ) {
        setUserK( parseInt( evy ) )
    }
    

    return (

        <div
            className="formy"
            key="formyKey">



            <br />
            <Iputty onChange={ handleIputChange } reffy={ iput } />
            
            <br />

            { ( filey !== 'natalia' ) 
                ? <><h4>YOUR LOGO</h4>
                    <RenderImage  img={ filey } />
                </> : 'NO LOGO CHOSEN' }

            <Sepper ht={ 1 } />






            <Tits tit={ 'VIBRANT' } />


            { ( filey !== 'natalia' )
                ? <TableyTable 
                    calars={ final } 
                    threshold={ secondaryPOP }
                    title={ 'FINAL ( SEND TO _WATCHY )' }
                    />
                : <><TableyTable calars={ palette } />{ 'no image in state' }</> }

            <Sepper ht={ 3 } />






            {/* STEP 1 */}
            { ( filey !== 'natalia' )
                ? <TableyTable 
                    calars={ palette }
                    threshold={ primaryPOP }
                    // threshold={ 8 }
                    title={ 'STEP 1 - PRIMARY ( Over Population Threshold )' }
                    // setPalette={ setPalette }
                    />
                : <><TableyTable calars={ palette } setPalette={ setPalette } />{ 'no image in state' }</> }




            {/* STEP 2 */}
            <Sepper ht={ 1 } />
            { ( filey !== 'natalia' )
                ? <TableyTable 
                    calars={ palette } 
                    threshold={ secondaryPOP }
                    title={ 'STEP 2 - LEFTOVERS ( Over Bottom-Line Pop Threshold )' }
                    // setPalette={ setPalette }
                    />
                : <><TableyTable calars={ palette } setPalette={ setPalette }/>{ 'no image in state' }</> }




            {/* STEP 3 */}
            <Sepper ht={ 1 } />
            { ( filey !== 'natalia' )
                ? <TableyTable 
                    calars={ outliers } 
                    threshold={ secondaryPOP }
                    title={ 'STEP 3 - OUTLIERS ( Leftovers, Not Within Any PRIMARY Cluster )' }
                    // setPalette={ outliers }
                    />
                : <>
                    <TableyTable calars={ palette } />{ 'no image in state' }</> }



            {/* STEP 4 */}
            <Sepper ht={ 1 } />
            { ( filey !== 'natalia' )

                ? <TableyTable 
                    calars={ clusteredOs } 
                    threshold={ secondaryPOP }
                    title={ 'STEP 4 - CLUSTERS FROM OUTLIERS' }
                    // setPalette={ outliers }
                    />
                : <><TableyTable calars={ palette } />{ 'no image in state' }</> }



                            {/* STEP 5 */}
            <Sepper ht={ 1 } />
            { ( filey !== 'natalia' )

                ? <TableyTable 
                    calars={ primary } 
                    threshold={ secondaryPOP }
                    title={ 'STEP temp - palette by pop' }
                    // setPalette={ outliers }
                    />
                : <><TableyTable calars={ palette } />{ 'no image in state' }</> }





            <Sepper ht={ 3 } />

            <Tits tit={ 'K-MEANS' } />
        
            { ( filey !== 'natalia' )
                ? <KMeany 
                    filey={ filey } 
                    userK={ userK } 
                    handleTheDropDown={ handleTheDropDown }
                    />
                : 'POppa POOey' }
        
            <Sepper ht={ 3 } />

        </div>
    )
}

// const QImgEl = props => <img { ...props } />


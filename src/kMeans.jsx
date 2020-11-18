import React , { useState , useEffect , useRef , forwardRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


// function ShowClusters( clus ) {
//     var kk = clus.length;
//     // clus.forEach( clu => {
//     //     clu.forEach( pointarray => {
//     //         return (
//     //             <Row>
//     //                 { pointarray }
//     //             </Row>
//     //         )
//     //     })
//     // })
// }
async function setQ( ev ) {
    // setFile( ev )
    // var oUrl = window.URL.createObjectURL( ev )
    // var pmg = new Image( )
    // pmg.src = ev;
    // var oUrl = pmg
    ev = ev.toString( )
    var a = await window.Vibrant.from( ev ).getPalette( )
    console.log( 'qqqqq V III B rant' )
    console.log( a )
    var ok = Object.keys( a )
    var tp = 0;
    var ab = [ ];
    ok.forEach( asdf => {
        if ( ( a[ asdf ] !== null ) && ( typeof a[ asdf ][ '_population' ] !== 'undefined' ) ) { 
            a[ asdf ][ 'name' ] = asdf;
            ab.push( a[ asdf ] )
            tp += a[ asdf ]._population;
        }
    } )
    console.log( ab )
    console.log( tp )

    ab.forEach( ( asdf , sas ) => { ab[ sas ][ '_ht' ] = asdf._population / tp * 100 } )
    console.log( 'qQqQqQqQqQqQqQqQ' )
    console.log( ab )
    console.log( 'qQqQqQqQqQqQqQqQ' )
    // setPoop( ab )
}

const SepTor = props => ( <><br /><br /><div style={ { height : props.ht * 10 + 'px' , borderTop : '1px black solid' } } /></>)

const QuantBut = forwardRef( ( props , ref ) => <Button ref={ ref } className="btn-tranny" { ...props } /> )

const Canver = forwardRef( ( props , ref ) => <canvas ref={ ref } width={ props.width } height={ props.height } /> )

function RenderImageFinal ( props ) {
    setQ( props.img )
    return <><h5>{'rendimagefinal'}</h5><img src={ props.img } alt={ 'fromKMeans' } /></>
}
export default function KMeany( props ) {

    var handleTheDropDown = props.handleTheDropDown;
    var userK = props.userK;

    var [ quantized , setQuantized ] = useState( 'nanny' )
    var [ poop , setPoop ] = useState( 'banny' )
    var [ clusters , setClusters ] = useState( [ ] )
    // var [ palette , setPalette ] = useState(  )

    var qimgref = useRef( );
    var quantized_img = qimgref.current;

    var qbut = useRef( );
    var quantize_btn_element = qbut.current;
    
    // // var qieref = props.quiref;
    // var qieref = useRef( );
    // var quantized_img_element = qieref.current;


    var canvref = useRef( )
    console.log( canvref )
    console.log( canvref.current )
    var canvas = canvref.current;
    console.log( canvas )

    var quantcanvref = useRef( )
    var quantized_canvas = quantcanvref.current;


    useEffect( ( ) => {
        const canvas = canvref.current
        const context = canvas.getContext( '2d' )
        //Our first draw
        context.imageSmoothingEnabled = false;
        context.fillStyle = '#000000'
        context.fillRect( 0 , 0 , context.canvas.width , context.canvas.height )
      } , [ ] )

    var centroids = [ ];
    var MAX_K_MEANS_PIXELS = 50000;

    var arrays_equal = function( a1 , a2 ) {
        console.log( a1 )
        console.log( a2 )
        if ( a1.length !== a2.length ) return false;
        for (var i = 0; i < a1.length; ++i) {
            if (a1[i] !== a2[i]) return false; }
        return true; 
    }

    // Given width w and height h, rescale the dimensions to satisfy
    // the specified number of pixels.
    var rescale_dimensions = function(w, h, pixels) {
        var aspect_ratio =      w / h;
        var scaling_factor =    Math.sqrt( pixels / aspect_ratio );
        var rescaled_w =        Math.floor( aspect_ratio * scaling_factor );
        var rescaled_h =        Math.floor( scaling_factor );
        return [ rescaled_w , rescaled_h ];
    }



    var pre_quantize = function() {
        // Clear any existing image.

        // if (quantized_img.hasAttribute("src")) {
        //     quantized_img.removeAttribute("src");
        // }
        // quantize_btn_element.disabled = true;
        // input_file_element.disabled = true;
        // k_selections_element.disabled = true;
        // status_element.textContent = "Processing...";
    };

    var post_quantize = function( ) {
        // quantize_btn_element.disabled = false;
        // input_file_element.disabled = false;
        // k_selections_element.disabled = false;
        // status_element.textContent = "";
    };


    // Given an Image, return a dataset with pixel colors.
    // If resized_pixels > 0, image will be resized prior to building
    // the dataset.
    // return: [[R,G,B,a], [R,G,B,a], [R,G,B,a], ...]
    var get_pixel_dataset = function( img, resized_pixels ) {

        if ( resized_pixels === undefined ) resized_pixels = -1;
        // Get pixel colors from a <canvas> with the image
        var canvas = canvref.current;
        console.log( canvas )

        var img_n_pixels = img.width * img.height;
        var canvas_width = img.width;
        var canvas_height = img.height;
        console.log( img_n_pixels )

        if (resized_pixels > 0 && img_n_pixels > resized_pixels) {
            var rescaled = rescale_dimensions(img.width, img.height, resized_pixels)
            canvas_width = rescaled[0];
            canvas_height = rescaled[1];
        }

        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var canvas_n_pixels = canvas_width * canvas_height;
        var context = canvas.getContext( "2d" );
        context.imageSmoothingEnabled = false;

        context.drawImage( img , 0 , 0 , canvas_width , canvas_height );  
        var flattened_dataset = context.getImageData(
            0 , 0 , canvas_width , canvas_height ).data;
        var n_channels = flattened_dataset.length / canvas_n_pixels;
        var dataset = [ ]
        for ( var ixy = 0; ixy < flattened_dataset.length; ixy += n_channels ) {
            dataset.push( flattened_dataset.slice( ixy , ixy + n_channels ) );
        }
        return dataset;
    };

    // Given a point and a list of neighbor points, return the index
    // for the neighbor that's closest to the point.
    var nearest_neighbor = function( point , neighbors ) {
        var best_dist = Infinity; // squared distance
        var best_index = -1;
        for (var i = 0; i < neighbors.length; ++i) {
            var neighbor = neighbors[i];
            var dist = 0;
            for (var j = 0; j < point.length; ++j) {
            dist += Math.pow(point[j] - neighbor[j], 2);
            }
            if (dist < best_dist) {
            best_dist = dist;
            best_index = i;
            }
        }
        return best_index;
    };

    // Returns the centroid of a dataset.
    var centroid = function(dataset) {
        if (dataset.length === 0) return [];
        // Calculate running means.
        var running_centroid = [];
        for (var ix = 0; ix < dataset[0].length; ++ix) {
            running_centroid.push(0);
        }
        for (var iy = 0; iy < dataset.length; ++iy ) {
            var point = dataset[ iy ];
            for (var j = 0; j < point.length; ++j) {
                running_centroid[ j ] += ( point[ j ] - running_centroid[ j ]) / ( iy + 1 );
            }
        }
        return running_centroid;
    };



    // Returns the k-means centroids.
    var k_means = function( dataset , k ) {
        k = userK;
        if ( k === undefined ) k = Math.min( 3 , dataset.length );
        // Use a seeded random number generator instead of Math.random(),
        // so that k-means always produces the same centroids for the same
        // input.
        var rng_seed = 0;
        
        var random = function( ) {
            rng_seed = ( rng_seed * 9301 + 49297 ) % 233280;
            return rng_seed / 233280;
        };
        // Choose initial centroids randomly.
        for ( var iz = 0; iz < k; ++iz ) {
            var idx = Math.floor( random( ) * dataset.length );
            centroids.push( dataset[ idx ] );
        }

        while ( true ) {
            // 'clusters' is an array of arrays. each sub-array corresponds to
            // a cluster, and has the points in that cluster.
            var clusters = [ ];

            for ( var iaa = 0; iaa < k; ++iaa ) {
                clusters.push( [ ] );
            }

            for ( var ibc = 0; ibc < dataset.length; ++ ibc ) {
                var point = dataset[ ibc ];
                var nearest_centroid = nearest_neighbor( point , centroids )
                // console.log( nearest_centroid )
                clusters[ nearest_centroid ].push( point );
            }
            console.log( '_________' )
            console.log( clusters )

            var converged = true;

            for ( var iab = 0; iab < k; ++iab ) {
                var cluster = clusters[ iab ];
                var centroid_i = [ ];
                if ( cluster.length > 0 ) {
                    centroid_i = centroid( cluster );
                } else {
                    // For an empty cluster, set a random point as the centroid.
                    var idx = Math.floor( random( ) * dataset.length );
                    centroid_i = dataset[ idx ];
                }
                converged = converged && arrays_equal( centroid_i , centroids[ iab ] );
                centroids[ iab ] = centroid_i;
                }
            if ( converged ) {
                setClusters( clusters )
                break;
            }
        }
        console.log( 'FINISHED K MEANS FUNKTION' )
        return centroids;
    };

    // Takes an <img> as input. Returns a quantized data URL.
    var quantize = function( img, colors ) {
        var width = img.width;
        var height = img.height;
        console.log( width + ' <> ' + height )
        var source_canvas = document.createElement("canvas");
        // var source_canvas = document.createElement("canvas");
        source_canvas.width = width;
        source_canvas.height = height;
        var source_context = source_canvas.getContext("2d");
        source_context.imageSmoothingEnabled = false;

        source_context.drawImage(img, 0, 0, width, height);
        
        // flattened_*_data = [R, G, B, a, R, G, B, a, ...] where
        // (R, G, B, a) groups each correspond to a single pixel, and they are
        // column-major ordered.
        var flattened_source_data = source_context.getImageData(
            0, 0, width, height ).data;
        var n_pixels = width * height;
        var n_channels = flattened_source_data.length / n_pixels;
        
        var flattened_quantized_data = new Uint8ClampedArray(
            flattened_source_data.length);
        
        // Set each pixel to its nearest color.
        var current_pixel = new Uint8ClampedArray(n_channels);

        for ( var i = 0; i < flattened_source_data.length; i += n_channels) {
            // This for loop approach is faster than using Array.slice().
            for ( var j = 0; j < n_channels; ++j) {
            current_pixel[ j ] = flattened_source_data[ i + j] ;
            }
            var nearest_color_index = nearest_neighbor( current_pixel , colors );
            var nearest_color = centroids[ nearest_color_index ];
            for ( var jx = 0; jx < nearest_color.length; ++jx ) {
            flattened_quantized_data[ i + jx ] = nearest_color[ jx ];
            }
        }
      
        var quantized_context = quantized_canvas.getContext( "2d" );
        quantized_context.imageSmoothingEnabled = false;
        console.log( quantized_context )
        console.log( width )
        console.log( height )
        var image = quantized_context.createImageData( width , height );
        console.log( image )
        image.data.set( flattened_quantized_data );
        quantized_context.putImageData( image , 0 , 0 );
        var data_url = quantized_canvas.toDataURL( );
        setQuantized( data_url )

        return data_url;
    };


    function handleQClick ( ) {
        
        // Handle "Quantize" button.
        // quantize_btn_element.addEventListener("click", function() {
            // var files = input_file_element.files;
            // if (!FileReader || !files || !files.length) return;
            var reader = new FileReader();
            console.log( reader )
            reader.addEventListener( "load", function( ) {
                var k = 3
                //parseInt(k_selections_element.value);
                var img = new Image( )
                console.log( img )
                img.onload = function( ) {
                    // Use a combination of requestAnimationFrame and setTimeout
                    // to run quantize/post_quantize after the next repaint, which is
                    // triggered by pre_quantize().
                    requestAnimationFrame( function( ) {
                        setTimeout( function( ) {
                        // Use a fixed maximum so that k-means works fast.
                        var pixel_dataset = get_pixel_dataset( img , MAX_K_MEANS_PIXELS );
                        console.log( pixel_dataset )
                        var centroids = k_means( pixel_dataset , k );
                        console.log( centroids )
                        var data_url = quantize( img , centroids );
                        console.log( data_url )
                        // var quantized_img = qieref.current;
                        quantized_img.src = data_url;
                        // show_modal();
                        post_quantize( );
                        } , 500 )
                    } )
                    pre_quantize( )
                }
                img.src = reader.result;
                console.log( reader.result )

            } )
            console.log( props.filey )
            var urlForFiley = window.URL.createObjectURL( props.filey )
            console.log( urlForFiley )
            reader.readAsDataURL( props.filey )
            setQ( props.filey )
            // reader.readAsDataURL( urlForFiley );
            // } )
    }




return (


    <div>

        
        <img ref={ qimgref } />

        <h3>preCANVAS</h3>
        <Canver ref={ canvref } id='preCanvas' />

        <br />

        <QuantBut ref={ qbut } onClick={ handleQClick } >Q U A N t i ZIIIIZE eeee ! </QuantBut>

        {/* <SepTor ht={ 3 } /> */}
        
        <SepTor ht={ 3 } />

        <h3>FINAL CANVAS</h3>

        <Canver ref={ quantcanvref } id='quantCANV' />

{ quantized !== 'nanny' 
?        <RenderImageFinal img={ quantized } />
:       'nanny'
}



        <Dropdown drop="right"
            className=" mar-btm-low"
            onSelect={ handleTheDropDown }
            >

            <Dropdown.Toggle
                id="dropdown-basic"
                className="ls btn-tranny"
                >
                { userK }
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                    id="unoK" 
                    eventKey={ 3 }
                    >
                    3
                </Dropdown.Item>

                <Dropdown.Item
                    id="ddbcg"
                    eventKey={ 4 }
                    >
                    4
                </Dropdown.Item>

                <Dropdown.Item
                    id="ddpremium"
                    eventKey={ 5 }

                    >
                    5
                </Dropdown.Item>
                <Dropdown.Item
                    id="ddpremium"
                    eventKey={ 6 }

                    >
                    6
                </Dropdown.Item>
                <Dropdown.Item
                    id="ddpremium"
                    eventKey={ 7 }

                    >
                    7
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

{/* 
        {
            ( clusters[ 0 ][ 0 ].length === 4 )
            ? <ShowClusters clusters={ clusters } />
            : 'clusters here'

        } */}



    </div>

    )
}
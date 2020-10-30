import React from 'react';
import Container from 'react-bootstrap/Container';

function About() {
    return (
            <Container style={{ backgroundColor: 'white', paddingBottom: 120 }}>
        <div style={{ marginBottom: 20 }}>
            <h1>About </h1>{' '}
            <h1>
            <font style={{ color: '#26B020', fontWeight: 'bold' }}>Pan-Lang:</font>
            </h1>
            <body>
                Pan-Lang is an organizational web application designed to help local food bank organizers 
                keep track of orders, visitor records, and communicate with non-English speaking patrons. 
                <br></br><br></br>
                Food insecurity is an important issue in the Champain County community. Nearly 15% of residents
                must deal with food insecurity. Many of these individuals are also ineligible for federal nutrition 
                programs and must rely on local food pantries for meals. 
                <br></br><br></br>
                On top of this, many of these individuals speak limited English, making it difficult for them to 
                communicate their needs to food pantry staff. With Pan-Lang, our mission is to break this language 
                barrier and provide a more efficient method of supporting those in need. 

            </body>
      </div>
    </Container>
    );
}

export default About;
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import SoundPlayer from 'react-native-sound-player';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class CardImageExample extends Component {
    constructor(props)
    {
        super(props);

        this.state = {

        }
    }
    playMusic = () =>
    {
        try {
            // play the file tone.mp3
            SoundPlayer.playSoundFile('sakura', 'mp3');
            // or play from url
            // SoundPlayer.playUrl('https://example.com/music.mp3')
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text>Sakura</Text>
                                    <Text note>Ikimonogakari </Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: 'https://res.cloudinary.com/ninjahh/image/upload/v1575620163/ninja_restaurant/x8tpmyihyvxav2tmrybw.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Button transparent>
                                        <Icon active name="md-skip-backward" />
                                    </Button>
                                </Col>
                                <Col>
                                    <Button transparent onPress={this.playMusic}>
                                        <Icon active name="md-play" />
                                    </Button>
                                </Col>
                                <Col>
                                    <Button transparent>
                                        <Icon active name="md-skip-forward" />
                                    </Button>
                                </Col>
                            </Grid>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
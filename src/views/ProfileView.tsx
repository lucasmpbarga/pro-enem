import { Button, Container, Content, Header } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { NavigationScreenConfig, NavigationScreenOptions, NavigationScreenProp, ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../store';
import * as CredentialsActions from '../store/reducers/credentials/actions';
import * as PersonActions from '../store/reducers/person/actions';
import { Person } from '../store/reducers/person/types';



interface StateProps {
    credentialId: number,
    person: Person,
    loading: boolean,
    error: boolean,
}

interface DispatchProps {
    authenticateClear(): void,
    personRequest(personId: number): void,
}

interface OwnProps {
    navigation: NavigationScreenProp<State>,
}

type Props = StateProps & DispatchProps & OwnProps

class ProfileView extends Component<Props> {
    static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = {
        header: null
    };

    componentDidMount() {
        this.props.personRequest(this.props.credentialId);
        this.props.error && this.logout();
    }

    logout = (): void => {
        this.props.authenticateClear();
        this.props.navigation.navigate('Login');
    }

    render() {
        const { imageProfile, name, email, subscriptions } = this.props.person;
        const { loading } = this.props;
        return (
            <Container>
                <Header />
                <Content contentContainerStyle={{ flex: 1 }}>
                    {
                        loading &&
                        <View style={{ flex: 8, alignItems: 'center' }}>
                            <Text>Loading...</Text>
                        </View>
                    }
                    {
                        !loading &&
                        <View style={{ flex: 8 }}>
                            {
                                name && !loading &&
                                <View style={{ flex: 1 }}>
                                    <View style={styles.personDataContainer}>
                                        <View style={styles.personData}>
                                            <View style={styles.personImageContainer}>
                                                <Image source={{ uri: imageProfile }} style={styles.personImage} />
                                            </View>
                                            <View style={styles.personInfoContainer}>
                                                <Text style={styles.personName}>{name}</Text>
                                                <Text style={styles.personEmail}>{email}</Text>
                                                <Text style={styles.listTile}>Lista de cursos assinados</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.coursesListContainer}>
                                        <ScrollView>
                                            {
                                                subscriptions.map(sub => {
                                                    return (
                                                        <Text style={styles.courseDescription}>{`${sub.id}: ${sub.description}`}</Text>
                                                    );
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                </View>
                            }
                        </View>
                    }
                    <View style={styles.logoutContainer}>
                        <Button rounded danger
                            style={styles.logoutBtn}
                            onPress={this.logout}
                        >
                            <Text style={styles.logoutLabel}> Logout </Text>
                        </Button>
                    </View>
                </Content>
            </ Container>
        );
    }
}

const styles = StyleSheet.create({
    logoutContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    logoutBtn: {
        alignSelf: 'center',
    },
    logoutLabel: {
        color: 'white',
        marginHorizontal: 30,
    },
    personDataContainer: {
        flex: 3,
    },
    personData: {
        flex: 1,
        flexDirection: 'row'
    },
    personImageContainer: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    personImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 100,
    },
    personInfoContainer: {
        flex: 6,
        paddingVertical: 30,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    personName: {
        fontSize: 25,
        color: 'black',
    },
    personEmail: {
        fontSize: 15,
        color: 'black',
    },
    listTile: {
        fontSize: 15,
        color: 'black',
    },
    coursesListContainer: {
        flex: 5,
        alignItems: 'center',
        paddingVertical: 15,
    },
    courseDescription: {
        fontSize: 25,
        color: 'black',
    },
});

const mapStateToProps = (state: ApplicationState) => ({
    credentialId: state.credentials.data.id,
    person: state.person.data,
    loading: state.person.loading,
    error: state.person.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({ ...CredentialsActions, ...PersonActions }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
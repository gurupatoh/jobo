import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Screen, useRouter } from 'expo-router';
import styles from './welcome.style';
import ScreenHeaderBtn from '../../common/header/ScreenHeaderBtn';
import { icons, SIZES, COLORS } from '../../../constants';

const jobTypes = ['full time', 'part time', 'contract'];

const Welcome = ({
  searchTerm,
  setSearchTerm,
  handleClick,
  name,
  profileImage,
}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('full time');
  const firstName = name.split(' ')[0];

  return (
    <View>
      <View>
      <View
  style={{
    backgroundColor: COLORS.lightWhite,
    shadowOpacity: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}
>
  <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />

  <Image
    source={{ uri: profileImage }}
    style={styles.profileImage}
  />
</View>
        <View style={styles.container}>
          <Text style={styles.userName}>Hello {firstName}!</Text>
          <Text style={styles.welcomeMessage}>Find Job?</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              placeholder="Search job"
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tabsContainer}>
          <FlatList
            data={jobTypes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={() => {
                  setActiveJobType(item);
                  router.push(`/search/${item}`);
                }}
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          />
        </View>
      </View>
    </View>
  );
};


export default Welcome;

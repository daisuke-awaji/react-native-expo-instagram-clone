import { Video } from "expo-av";
import * as React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../components/Themed";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

interface IData {
  id: string;
  title: string;
  mediaType: "image" | "video";
  imageUrl: string;
}

const DATA: IData[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    mediaType: "image",
    imageUrl:
      "https://mymodernmet.com/wp/wp-content/uploads/2019/03/elements-of-art-6.jpg",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    mediaType: "image",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxQ0tEW64k9a8Vy2l44rXd7QSSZFEONsv4kBd5BkGsEDI781wLpY3-eMTEKDtfPtdGrfcW9rUNjwYak5N6ij5FQsB-08Ryp75NHCytEMM&usqp=CAU&ec=45725304",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    mediaType: "image",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQyAEreljPlPHbWkL-LeV9D_LaJg_OfFvbYAeu28x6bgrTKEcT0Fk09lCiUZJ2vGww8jBdHYgCsEAROoHvPW7uILRpG7qqxf9APM8BEWbE&usqp=CAU&ec=45725304",
  },
  {
    id: "4",
    title: "4",
    mediaType: "image",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSv2748bBkXCFAtCsyhemwrLy6pslelfzxIUqNHd8Apii5stYs4LTUMhr5KQqLsNOjUX7KtmIKT1QFDQ6TbkytsVmdorETlyBT_mw6Vm3g&usqp=CAU&ec=45725304",
  },
  {
    id: "5",
    title: "5",
    mediaType: "video",
    imageUrl: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
];

export function DetailsScreen({ route }: any) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>{item.id}</Text>
      <Text>{item.title}</Text>
    </View>
  );
}

type Item = {
  item: IData;
  onPress: () => any;
  style: any;
  shouldPlay: boolean;
};
const Item = ({ item, onPress, style, shouldPlay }: Item) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={styles.itemContainer}>
      {item.mediaType === "image" ? (
        <Image
          source={{ url: item.imageUrl } as ImageSourcePropType}
          style={styles.photo}
        />
      ) : (
        <Video
          source={{
            uri: item.imageUrl,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={shouldPlay}
          isLooping
          style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT * 0.4 }}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default function TabOneScreen({ navigation }: any) {
  const [viewableItemIndex, setViewableItemIndex] = React.useState(0);

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    setViewableItemIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item, index }: any) => {
    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate("DetailsScreen", {
            item,
          })
        }
        style={styles.item}
        shouldPlay={index === viewableItemIndex}
      />
    );
  };

  const dotColor = (index: number) => {
    return index === viewableItemIndex ? styles.colorDot : styles.whiteDot;
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.dotWrapper}>
        {DATA.map((item, index) => {
          return <View key={index} style={[styles.dot, dotColor(index)]} />;
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  itemContainer: {
    backgroundColor: "red",
    borderRadius: 10,
    height: WINDOW_HEIGHT * 0.4,
    width: WINDOW_WIDTH,
  },
  item: {},
  photo: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.4,
  },
  dotWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  colorDot: {
    backgroundColor: "#6BA3EF",
  },
  whiteDot: {
    backgroundColor: "#E2E2E2",
  },
});

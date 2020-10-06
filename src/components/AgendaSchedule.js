import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { AntDesign, EvilIcons, Octicons } from "@expo/vector-icons";
const dummy = require("../apis/dummy.json");

const AgendaSchedule = () => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -10; i < 30; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = dummy.timeTable[strTime]
            ? dummy.timeTable[strTime]
            : [];
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 2000);
  };
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          Alert.alert("Đi học để xây dựng quê hương đất nước nhé ! :)))")
        }
      >
        <View style={styles.title}>
          <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
            {item.lopHocPhan}
          </Text>
          <Text style={styles.content}>
            <AntDesign name="clockcircleo" size={18} color="black" />{" "}
            {parsePeriods(item.timestamp.start)} -{" "}
            {parsePeriods(item.timestamp.end)}
          </Text>
          <Text style={styles.content}>
            <EvilIcons name="location" size={18} color="black" />{" "}
            {item.location}
          </Text>
          <Text style={styles.content}>
            <Octicons name="person" size={18} color="black" /> {item.giangVien}
          </Text>
          <Text style={styles.content}>Số tín chỉ : {item.soTc}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>Xếp lịch mà đi chơi !</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };
  const parsePeriods = (time) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={timeToString(new Date().getTime())}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        pastScrollRange={10}
        futureScrollRange={10}
      />
    </SafeAreaView>
  );
};

export default AgendaSchedule;

const styles = StyleSheet.create({});

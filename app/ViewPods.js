import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { View, Text } from "react-native-animatable";
import AppButton from "./AppButton";




const ViewPods = () => {

  const [oldtext, setoldtext] = useState("Sri lanka is a beautiful country.I love my country");
  const [newtext, setnewtext] = useState("");
  const [per, setper] = useState(0);
  const [submit, setSubmit] = useState(false)



  const check = (s1, s2) => {
    setSubmit(true)
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    setper((longerLength - editDistance(longer, shorter)) / parseFloat(longerLength));
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);


  }

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();

    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];

  }




  return (



    <View style={{ margin: 20 }}>
      <Text>{oldtext}</Text>
      <TextInput
        placeholder="Type Your Answer"
        onChangeText={text => setnewtext(text)}
        autoCapitalize="none"
        autoCorrect={false}
        style={{ marginTop: 20, marginBottom: 20 }}
      />
      <View>
        <AppButton title="Submit Your Answer" onPress={() => check(oldtext, newtext)} />
      </View>


      {submit && <Text style={{ marginTop: 20, marginBottom: 20 }}>{per * 100}%</Text>}
    </View>


  );
};

export default ViewPods;
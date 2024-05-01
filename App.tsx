import React from 'react';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): React.JSX.Element {

  const [expr, setExpr] = useState('');

  const [rows, _] = useState([
    ['='],
    ['AC', '()', 'del', '+/-'],
    ['0', '.', '%', '+'],
    ['1', '2', '3', '-'], 
    ['4', '5', '6', '*'], 
    ['7', '8', '9', '/']
  ]);

  function updateCalculation(op: any) {
    console.log(op)
    if(op.item == 'AC') {
      setExpr(expr => '');
    } else if(op.item == 'del') {
      setExpr(expr => expr.substring(0, expr.length-1));
    } else if(op.item == '=') {
      setExpr(expr => eval(expr));
    } else {
      setExpr(expr => expr + op.item);
    }
    try {
    console.log(eval(expr));
    } catch(err) {
      console.log(err);
    }
  }

  function renderRowItems(items: any) {
    return (!!items && items.map((item:any) => 
      <Pressable key={item} onPress={e => updateCalculation({item})}>
        <Text style={styles.numberItem}>{item}</Text>
      </Pressable>
      ))
  }

  function renderRow(row: any){
    return (
      <View style={styles.btnRow}>
              {renderRowItems(row)}
        </View>
    )
  }
  return (
    <SafeAreaView style={{}}>
      <View style={styles.calcContainer}>
        <View style={styles.resultArea}>
          <Text style={styles.calcFont}>{expr} </Text>
        </View>
        <View style={styles.btnContainer}>
          {rows ? rows.map(row => renderRow(row)): null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  calcContainer: {
    flexDirection: 'column',
    padding: 10,
    borderWidth: 1,
    margin: 5,
    height: '100%',
   justifyContent: 'space-between'
  },
  resultArea: {
    backgroundColor: 'lightgrey',
    //flexBasis: 100,
    borderWidth: 1,
    borderRadius: 10,
    flexGrow: 1,
    marginBottom: 10,
  },
  calcFont: {
    fontWeight: "600",
    fontSize: 26
  },
  btnContainer: {
    flexDirection: "column",
    //flexWrap: 'wrap',
    borderWidth: 1,
    marginBottom: 20
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 0,
    width: '100%'
  },
  numberItem: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'lightgrey',
    width: 60,
    height: 60,
    margin: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
  }
});

export default App;

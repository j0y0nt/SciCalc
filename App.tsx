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

  const [currExpr, setcurrExpr] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [rows, _] = useState([
    ['='],
    ['AC', '()', 'del', '+/-'],
    ['0', '.', '%', '+'],
    ['1', '2', '3', '-'],
    ['4', '5', '6', '*'],
    ['7', '8', '9', '/']
  ]);

  function updateCalculation(op: any) {

    if (op.item == 'AC') {
      setcurrExpr(currExpr => '');
    } else if (op.item == 'del') {
      setcurrExpr(currExpr => currExpr.substring(0, currExpr.length - 1));
    } else if (op.item == '+/-') {
      // Todos:
    } else if (op.item == '=') {
      try {
        setcurrExpr(currExpr => (eval(currExpr)).toString());
        setErrMsg(msg => '');
      } catch (err) {
        // Only reason calculator error because user is noob.
        // Tell them to fix syntax.
        setErrMsg(msg => 'Invalid syntax.')
      }
    } else {
      if ('+-/*'.includes(op.item)) {
        op.item = ' ' + op.item + ' ';
      }
      setcurrExpr(currExpr => currExpr + op.item);
    }

  }

  function renderRowItems(items: any) {
    return (!!items && items.map((item: any) =>
      <Pressable key={item} onPress={e => updateCalculation({ item })}>
        <Text style={styles.numberItem}>{item}</Text>
      </Pressable>
    ))
  }

  function renderRow(row: any) {
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
          <Text style={styles.calcFont}>{currExpr} </Text>
        </View>
        <View>
          <Text>{errMsg}</Text>
        </View>
        <View style={styles.btnContainer}>
          {rows ? rows.map(row => renderRow(row)) : null}
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
    borderWidth: 0,
    margin: 5,
    height: '100%',
    justifyContent: 'space-between'
  },
  resultArea: {
    //backgroundColor: 'lightgrey',
    //flexBasis: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    flexGrow: 1,
    marginBottom: 5,
    padding: 5,
  },
  calcFont: {
    fontWeight: "600",
    fontSize: 26
  },
  btnContainer: {
    flexDirection: "column",
    //flexWrap: 'wrap',
    borderWidth: 0,
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

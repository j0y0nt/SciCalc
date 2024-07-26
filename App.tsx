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
    [{k: 'equal', v: '='}],
    [{k: 'ac', v: 'AC'}, {k: 'paren', v: '()'}, {k: 'del', v: 'del'}, {k: 'csign', v: '+/-'}],
    [{k: 'zero', v: '0'}, {k: 'dot', v: '.'}, {k: 'percent', v: '%'}, {k: 'add', v: '+'}],
    [{k: 'one', v: '1'}, {k: 'two', v: '2'}, {k: 'three', v: '3'}, {k: 'minus', v: '-'}],
    [{k: 'four', v: '4'}, {k: 'five', v: '5'}, {k: 'six', v: '6'}, {k: 'multiply', v: 'x'}],
    [{k: 'seven', v: '7'}, {k: 'eight', v: '8'}, {k: '9', v: '9'}, {k: 'divide', v: '/'}]
  ]);

  function updateCalculation(op: any) {

    if (op.item.v == 'AC') {
      setcurrExpr(currExpr => '');
    } else if (op.item.v == 'del') {
      setcurrExpr(currExpr => currExpr.substring(0, currExpr.length - 1));
    } else if (op.item.v == '+/-') {
      // Todos:
    } else if (op.item.v == '=') {
      try {
        setcurrExpr(currExpr => (eval(currExpr)).toString());
        setErrMsg(msg => '');
      } catch (err) {
        // Only reason calculator error because user is noob.
        // Tell them to fix syntax.
        setErrMsg(msg => 'Invalid syntax.')
      }
    } else {
      if('x' === op.item.v) {
        setcurrExpr(currExpr => currExpr + ' ' + '*' + ' ');
      } else if ('+-/'.includes(op.item.v)) {
        setcurrExpr(currExpr => currExpr + ' ' + op.item.v + ' ');
      } else {
        setcurrExpr(currExpr => currExpr + op.item.v);
      }
    }

  }

  function renderRowItems(items: any) {
    
    return (!!items && items.map((item: any) =>
      
      <Pressable key={"calc-" + item.k} onPress={e => updateCalculation({ item })}>
        <Text  key={"label-" + item} style={styles.numberItem}>{item.v}</Text>
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
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  calcContainer: {
    flexDirection: 'column',
    padding: 0,
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

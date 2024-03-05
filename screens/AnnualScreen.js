import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image, 
  Button,
} from 'react-native';

const criteria = [
    { part: 'Yolk Spindle', rejection: { lessThan: 54.962 } },
    { part: 'Thickness Ring', rejection: { lessThan: 50.1 } },
    { part: 'Yolk Block Spindle', rejection: { lessThan: 34.968 } },
    { part: 'Bearing Ring', rejection: { lessThan: 4.8 } },
    { part: 'Yolk Okrot Bush', rejection: { moreThan: 55.47 } },
    { part: 'Yolk Block Orkot Bush', rejection: { moreThan: 35.585 } },
  ];

const PartMeasurement = ({ part, rejection, onMeasurementChange, style }) => {
  const [measurement, setMeasurement] = useState('');
  const [status, setStatus] = useState('');

  const handleMeasurementChange = (text) => {
    setMeasurement(text);
    let measurementValue = parseFloat(text);
    let pass = false;
    if (rejection.lessThan && measurementValue < rejection.lessThan) {
      pass = true;
    }
    if (rejection.moreThan && measurementValue > rejection.moreThan) {
      pass = true;
    }
    setStatus(pass ? 'Pass' : 'Fail');
    onMeasurementChange(part, measurementValue, pass);
  };

  return (
    <View style={[ styles.measurementRow, style ]}>
      <Text style={styles.partText}>{part}</Text>
      <TextInput
        style={styles.measurementInput}
        value={measurement}
        onChangeText={handleMeasurementChange}
        keyboardType="numeric"
      />
      <Text style={[styles.status, { color: status === 'Pass' ? 'green' : 'red' }]}>{status}</Text>
    </View>
  );
};

export default function AnnualScreen() {
  const [trainNumber, setTrainNumber] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [ppeOveralls, setPpeOveralls] = useState(false);
  const [ppeGloves, setPpeGloves] = useState(false);
  const [ppeBoots, setPpeBoots] = useState(false);
  const [tools, setTools] = useState({
    hexKey: false,
    cSpanner: false,
    safetyGlasses: false,
  });

  const [steps, setSteps] = useState([
    { id: 1, text: 'Remove the shaft retaining ring.', checked: false },
    { id: 2, text: 'Remove the M2 grub screw with a 4 mm Hex. Key', checked: false },
    { id: 3, text: 'Remove the M40 x 1.5 Lock nut with a C-Spanner.', checked: false },
    { id: 4, text: 'Remove Lock Nut Ring and Bearing Ring.', checked: false },
    { id: 5, text: 'Remove the Yoke Fitting and Bearing Ring.', checked: false },
    { id: 6, text: 'Measure Spindles and Bushings and compare against the rejection criteria.', checked: false },
    { id: 7, text: 'Strip and clean the full assembly ready for LTC inspection.', checked: false },
  ]);

  const toggleStep = (id) => {
    setSteps(steps.map(step => step.id === id ? { ...step, checked: !step.checked } : step));
  };

  const toggleTool = (tool) => {
    setTools({ ...tools, [tool]: !tools[tool] });
  };

  const [measurements, setMeasurements] = useState({});

  const handleSaveContinue = () => {
    // Dummy function to handle save and continue action
    alert('Save and Continue clicked!');
  };


  const handleMeasurementChange = (part, measurement, pass) => {
    setMeasurements(prevMeasurements => ({
      ...prevMeasurements,
      [part]: { measurement, pass }
    }));
  };

  const [comments, setComments] = useState('');

  // Split criteria into two columns
  const column1Criteria = criteria.slice(0, criteria.length / 2);
  const column2Criteria = criteria.slice(criteria.length / 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>STEP 2 of 25 REMOVE YOKE FITTING</Text>
        <View style={styles.inputInlineGroup}>
          <Text>Train Number:</Text>
          <TextInput
            style={styles.inputInline}
            onChangeText={setTrainNumber}
            value={trainNumber}
            keyboardType="numeric"
          />
          <Text>Chassis Number:</Text>
          <TextInput
            style={styles.inputInline}
            onChangeText={setChassisNumber}
            value={chassisNumber}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.flexRow}>
        {/* PPE Section */}
        <View style={styles.flexColumn}>
          <Text style={styles.subHeader}>PPE</Text>
          <Checkbox label="Overalls" checked={ppeOveralls} onPress={() => setPpeOveralls(!ppeOveralls)} />
          <Checkbox label="Safety Gloves" checked={ppeGloves} onPress={() => setPpeGloves(!ppeGloves)} />
          <Checkbox label="Safety Boots" checked={ppeBoots} onPress={() => setPpeBoots(!ppeBoots)} />
        </View>

        {/* Tools Section */}
        <View style={styles.flexColumn}>
          <Text style={styles.subHeader}>Tools</Text>
          <Checkbox label="4 mm Hex Key" checked={tools.hexKey} onPress={() => toggleTool('hexKey')} />
          <Checkbox label="C-Spanner" checked={tools.cSpanner} onPress={() => toggleTool('cSpanner')} />
          <Checkbox label="24 mm Socket" checked={tools.safetyGlasses} onPress={() => toggleTool('safetyGlasses')} />
        </View>
      </View>

      {/* Steps Section */}
      <Text style={styles.subHeader}>Steps</Text>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepRow}>
          <TouchableOpacity
            onPress={() => toggleStep(step.id)}
            style={styles.checkbox(step.checked)}
          ></TouchableOpacity>
          <Text>{index + 1}. {step.text}</Text>
        </View>
      ))}

{/* Measurement Section */}
<Text style={styles.subHeader}>Measurements</Text>
<View style={styles.measurementTable}>
  <View style={styles.measurementColumn}>
    {column1Criteria.map((item, index) => (
      <PartMeasurement
        key={index}
        part={item.part}
        rejection={item.rejection}
        onMeasurementChange={handleMeasurementChange}
      />
    ))}
  </View>
  <View style={styles.measurementColumn}>
    {column2Criteria.map((item, index) => (
      <PartMeasurement
        key={index}
        part={item.part}
        rejection={item.rejection}
        onMeasurementChange={handleMeasurementChange}
      />
    ))}
  </View>
</View>


      {/* Ensure that the imagesContainer is outside of the measurementTable View */}
      <View style={styles.imagesContainer}>
        <Image
          source={require('../assets/Vamp1.jpg')} // Make sure the path is correct
          style={styles.image}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/Vamp2.jpg')} // Make sure the path is correct
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
       {/* Comments Section */}
       <TextInput
        style={styles.commentsInput}
        onChangeText={setComments}
        value={comments}
        placeholder="Enter any comments or remarks here"
        multiline={true} // Allows for multiple lines of text
        numberOfLines={4} // Sets the number of lines before scrolling
      />

      {/* Save and Continue Button */}
      <View style={styles.saveContinueContainer}>
        <Button
          title="Save and Continue"
          onPress={handleSaveContinue}
          color="#1E90FF" // You can set your own color
        />
      </View>

    </ScrollView>
  );
}

const Checkbox = ({ label, checked, onPress }) => (
  <View style={styles.checkboxContainer}>
    <TouchableOpacity onPress={onPress} style={styles.checkbox(checked)}></TouchableOpacity>
    <Text>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputInlineGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputInline: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 50,
    marginHorizontal: 5,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexColumn: {
    flex: 1,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: (checked) => ({
    height: 20,
    width: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: checked ? 'green' : 'transparent',
  }),
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  partText: {
    flex: 1,
    marginRight: 10,
  },
  measurementInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 100,
    marginRight: 10,
  },
  status: {
    fontWeight: 'bold',
  },
  measurementTableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  measurementBlock: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  measurementText: {
    marginBottom: 5,
    fontSize: 16,
  },
  measurementResult: {
    fontWeight: 'bold',
  },
  // Styles for status text based on pass/fail result
  pass: {
    color: 'green',
  },
  fail: {
    color: 'red',
  },

  measurementTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  measurementColumn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 10,
  },

  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30, // Adjust this value to create more space if needed
  },
  image: {
    width: '55%', // Adjust width as needed
    height: 370, // Adjust height as needed
    resizeMode: 'contain',
  },

  commentsInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20, // Provide some space for the button
    minHeight: 80, // Set minimum height for the text input
  },
  saveContinueContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Positions the button to the right
    marginBottom: 20,
  },
});

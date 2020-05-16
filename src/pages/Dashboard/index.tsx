import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={singOut}>
        <Text style={{ fontSize: 30 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Dashboard;

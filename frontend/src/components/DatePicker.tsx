import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface YearWeekDialogProps {
    onClose: () => void;
    onSelect: (year: number, week: number) => void;
}

const YearWeekDialog: React.FC<YearWeekDialogProps> = ({
    onClose,
    onSelect,
}) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedWeek, setSelectedWeek] = useState(1);

    return (
        <Modal transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Select Year and Week</Text>

                    {/* Year Picker */}
                    <Text style={styles.label}>Year</Text>
                    <Picker
                        selectedValue={selectedYear}
                        onValueChange={(itemValue: any) => setSelectedYear(itemValue)}
                        style={styles.picker}
                    >
                        {[...Array(10)].map((_, i) => {
                            const year = currentYear + i;
                            return <Picker.Item key={year} label={year.toString()} value={year} />;
                        })}
                    </Picker>

                    {/* Week Picker */}
                    <Text style={styles.label}>Week</Text>
                    <Picker
                        selectedValue={selectedWeek}
                        onValueChange={(itemValue: any) => setSelectedWeek(itemValue)}
                        style={styles.picker}
                    >
                        {[...Array(52)].map((_, i) => {
                            const week = i + 1;
                            const startDate = new Date(selectedYear, 0, 1 + (week - 1) * 7);
                            const endDate = new Date(selectedYear, 0, 1 + week * 7 - 1);

                            const format = (date: Date) =>
                                `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;

                            const label = `${format(startDate)} – ${format(endDate)}`;

                            return <Picker.Item key={week} label={label} value={week} />;
                        })}

                    </Picker>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <Pressable style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.primaryButton]}
                            onPress={() => {
                                onSelect(selectedYear, selectedWeek);
                                onClose();
                            }}
                        >
                            <Text style={[styles.buttonText, { color: '#fff' }]}>Select</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 300,
        backgroundColor: '#1e1e1e',
        borderRadius: 15,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        height : 400
    },
    heading: {
        color: '#FFA500',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#333',
        color: '#fff',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    button: {
        padding: 10,
        marginLeft: 10,
    },
    primaryButton: {
        backgroundColor: '#FFA500',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFA500',
        fontWeight: 'bold',
    },
});

export default YearWeekDialog;

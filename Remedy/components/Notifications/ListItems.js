import React, {useState} from 'react';

import {SwipeListView} from "react-native-swipe-list-view";
import {Entypo} from "@expo/vector-icons";

import {
    ListView,
    TodoText,
    TodoDate,
    colors,
    HiddenButton,
    SwipedTodoText,
    ListViewHidden,
    TodoTitle
} from "../Notifications/styles";


const ListItems = ({todos, setTodos, handleTriggerEdit}) => {
    //For styling currently swiped todo row
    const [swipedRow, setSwipedRow] = useState(null);

    const handleDeleteTodo = (rowMap, rowKey) => {
        const newTodos = [...todos];
        const todoIndex =  todos.findIndex((todo) => todo.key === rowKey);
        newTodos.splice(todoIndex, 1);
        setTodos(newTodos);
    }

    return (
        <>
        {todos.length == 0 && <TodoText>You have no todos today</TodoText>}
        {todos.length != 0 && <SwipeListView
            data={todos}
            renderItem={(data) => {
                const RowText = data.item.key == swipedRow ? SwipedTodoText : TodoText;
                return(
                    <ListView
                        underlatColor={colors.primary}
                        onPress={() => {
                            handleTriggerEdit(data.item)
                        }}
                    >
                        <>
                            <TodoTitle>{data.item.title}</TodoTitle>
                            <TodoText>{data.item.text}</TodoText>
                            <TodoDate>{data.item.date}</TodoDate>
                        </>
                    </ListView>
                )
            }}
            renderHiddenItem={(data,rowMap) => {
                    return (
                        <ListViewHidden>
                            <HiddenButton
                                onPress={() => handleDeleteTodo(rowMap, data.item.key)}
                            >
                              <Entypo name="trash" size={25} color={colors.seconday}/>
                            </HiddenButton>
                        </ListViewHidden>
                    );
            }}
            leftOpenValue={80}
            previewRowKey={"1"}
            previewOpenValue={80}
            previewOpenDelay={3000}
            disableLeftSwipe={true}
            showsVerticalScrollIndicator={false}
            style={{
                flex: 1, paddingBottom: 30
            }}
            onRowOpen={(rowKey) => {
                setSwipedRow(rowKey);
            }}
            onRowClose={() => {
                setSwipedRow(null);
            }}
        />}
        </>
    );
}

export default ListItems;
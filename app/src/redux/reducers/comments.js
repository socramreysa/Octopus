import { GET_COMMENTS, ADD_COMMENTS, DELETE_COMMENT, EDIT_COMMENT, GET_MORE_COMMENTS } from '../actions/globalActions';

function commentsReducer(state = [] , action) {

	switch (action.type) {

	case GET_COMMENTS: {
		return Object.assign({}, state, {
			comments:action.comments
		});
	}

	case ADD_COMMENTS: {
		return Object.assign({}, state, {
			comment:action.comment
		});
	}

	case DELETE_COMMENT: {
		return Object.assign({}, state, {
			comments: [
			...state.slice(0,state.map(ob=>ob.comment_id).indexOf(action.id)),
			...state.slice(state.map(ob=>ob.comment_id).indexOf(action.id) + 1)
		]});
	}

	case EDIT_COMMENT: {
		return Object.assign({}, state, {
			comments: [
			...state.slice(0,state.map(ob=>ob.comment_id).indexOf(action.comment.comment_id)),
			action.comment,
			...state.slice(state.map(ob=>ob.comment_id).indexOf(action.comment.comment_id) + 1)
		]});
	}

	case GET_MORE_COMMENTS: {
		return Object.assign({}, state, {
			comments: action.comments
		});
	}

	default:
		return state;
	}
}

export default commentsReducer;


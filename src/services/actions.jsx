import { GET_ISSUES_OF_ONE_REPO, GET_ALL_AVAILABLE_REPOS,
	REQUEST_FAILED,SORT_ISSUES_BY_PRIORITY, INCREAMENT,DECREAMENT,RESETCOUNTER
} from './types';

export const getAllIssuesOfRepo=(url)=>{
	return dispatch=>{
		return httpRequest(url,'GET')
			.then(resp=>{
				if(!resp.ok){
				 throw new Error(resp.statusText);
				}
				//console.log(resp);
				return resp;
			})
			.then(resp=>resp.json())
			.then(body=>{
			//console.log(body);
				dispatch(getIssuesOfRepo(body));
			})
			.catch(err=>{
				dispatch(getRequestFailed(err));
			});
	};
};

export const getRepos = avail=> dispatch => dispatch(getAllRepos(avail));
export const getSortedList = sorted => dispatch => dispatch(getSortedIssueList(sorted));
export const increase = value => dispatch => dispatch(increaseByOne(value));
export const decrease = value => dispatch => dispatch(decreaseByOne(value));
export const reset =() => dispatch => dispatch(resetValue(0));

const httpRequest = (url, method, data) => 
	fetch(url, {
		method: method,
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});

const getAllRepos =(repos)=>({
	type:GET_ALL_AVAILABLE_REPOS,
	data: repos
});

const getIssuesOfRepo =(issues)=>({
	type:GET_ISSUES_OF_ONE_REPO,
	data:issues
});

const getRequestFailed = (err)=>({
	type:REQUEST_FAILED,
	error:err
});

const getSortedIssueList = (list)=>({
	type:SORT_ISSUES_BY_PRIORITY,
	data:list
});

const increaseByOne = (value) =>({
	type:INCREAMENT,
	data:value 
});

const decreaseByOne = (value) =>({
	type:DECREAMENT,
	data:value
});

const resetValue=(value)=>({
	type:RESETCOUNTER,
	data:value
})